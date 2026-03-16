import { GoogleGenAI, Type } from "@google/genai";
import { ProjectInput, StructuralReview } from "../types";

const STRUCTURAL_SYSTEM_INSTRUCTION = `
You are the BuildOS Africa Structural Inefficiency Detection Engine.

Your role is to review interpreted architectural layout data and detect likely structural inefficiencies or planning weaknesses that may affect buildability, cost, stability, or execution complexity.

You are an AI-assisted pre-construction review engine.
You do not replace structural engineers.
You provide early warnings and planning intelligence.

YOUR TASK
Analyze the design for likely inefficiencies such as:
- excessive structural complexity
- irregular layout geometry
- oversized unsupported spans
- inefficient circulation
- too many wet-area clusters in poor positions
- structural imbalance from projections or cantilevers
- unnecessary facade complexity that may raise cost
- planning elements that may complicate execution

ANALYSIS PRINCIPLES
Focus on probable issues such as:
- load distribution complexity
- column placement sensitivity
- staircase positioning inefficiency
- too much dead corridor space
- poor stacking of plumbing zones
- balcony or projection complexity
- unnecessary shape articulation
- poor simplicity-to-function ratio

IMPORTANT RULES
- Do not sound alarmist
- Do not claim structural failure
- Use language such as “may increase complexity,” “may require closer engineering review,” or “may introduce avoidable cost”
- Be practical, concise, and credible
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateStructuralReview(input: ProjectInput): Promise<StructuralReview> {
  const prompt = `
Building Type: ${input.buildingType}
Number of Floors: ${input.floors}
Estimated Built-up Area: ${input.builtUpArea} sqm
Room Arrangement Summary: ${input.bedrooms} Bedrooms, ${input.bathrooms} Bathrooms
Staircase Presence: ${input.floors > 1 ? 'Yes' : 'No'}
Balcony Presence: ${input.optionalFeatures?.includes('Penthouse') || input.floors > 1 ? 'Likely' : 'No'}
Major Span Observations: Based on ${input.builtUpArea} sqm area and ${input.buildingType} type
Structural Complexity Level: Based on ${input.finishLevel} finish and ${input.floors} floors
Optional Features: ${input.optionalFeatures?.join(', ') || 'None'}
Planning Notes: ${input.additionalNotes || 'None'}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: STRUCTURAL_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.OBJECT,
            properties: {
              complexityLevel: { type: Type.STRING },
              buildabilityAssessment: { type: Type.STRING },
              executionRiskLevel: { type: Type.STRING }
            },
            required: ["complexityLevel", "buildabilityAssessment", "executionRiskLevel"]
          },
          inefficiencies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                reason: { type: Type.STRING },
                implication: { type: Type.STRING }
              },
              required: ["title", "reason", "implication"]
            }
          }
        },
        required: ["summary", "inefficiencies"]
      }
    }
  });

  return JSON.parse(response.text);
}
