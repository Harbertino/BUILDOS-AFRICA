import { GoogleGenAI, Type } from "@google/genai";
import { ProjectInput, ProjectEstimate, StructuralReview, DesignImprovements, CostOptimization } from "../types";

const OPTIMIZATION_SYSTEM_INSTRUCTION = `
You are the BuildOS Africa Construction Cost Optimization Engine.

Your role is to review a building project profile and recommend practical ways to reduce unnecessary construction cost while preserving functionality, design quality, and project intent.

You are an AI cost-planning advisor for pre-construction decision-making.

YOUR TASK
Identify where the project may be overdesigned, inefficient, or unnecessarily expensive.

Focus on:
- finish-driven cost escalation
- facade complexity
- unnecessary floor area
- premium features with low value return
- poor structural simplicity
- inefficient wet-area planning
- overspecified materials
- non-essential external works

RULES
- Do not recommend unsafe cost cutting
- Do not compromise structural integrity
- Do not suggest removing essential waterproofing, reinforcement, or engineering requirements
- Prioritize smart simplification over cheapness
- Keep the tone premium and strategic
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateCostOptimization(
  input: ProjectInput,
  estimate: ProjectEstimate,
  structuralReview?: StructuralReview,
  designImprovements?: DesignImprovements
): Promise<CostOptimization> {
  const prompt = `
Project Summary: ${input.name}, ${input.buildingType}, ${input.location}, ${input.finishLevel}
Total Cost: ₦${estimate.totalCost.toLocaleString()}
Cost Breakdown: ${estimate.breakdown.map(b => `${b.name}: ${b.value}`).join(', ')}
Materials Estimate: ${estimate.materials.map(m => `${m.name}: ${m.quantity} ${m.unit}`).join(', ')}
Structural Review Findings: ${structuralReview?.inefficiencies.map(i => i.title).join(', ') || 'None'}
Design Improvement Findings: ${designImprovements?.priorityActions.join(', ') || 'None'}
Finish Level: ${input.finishLevel}
Optional Features: ${input.optionalFeatures?.join(', ') || 'None'}
Location: ${input.location}
Built-up Area: ${input.builtUpArea} sqm
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: OPTIMIZATION_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          pressurePoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 to 5 major cost drivers"
          },
          savingsOpportunities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                recommendation: { type: Type.STRING },
                reason: { type: Type.STRING },
                area: { type: Type.STRING }
              },
              required: ["recommendation", "reason", "area"]
            },
            description: "5 to 8 practical suggestions"
          },
          lowImpactCuts: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Areas where cost can be reduced with minimal design compromise"
          },
          highImpactDecisions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Features or decisions that materially change overall budget"
          }
        },
        required: ["pressurePoints", "savingsOpportunities", "lowImpactCuts", "highImpactDecisions"]
      }
    }
  });

  return JSON.parse(response.text);
}
