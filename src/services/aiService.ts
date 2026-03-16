import { GoogleGenAI, Type } from "@google/genai";
import { ProjectInput, ProjectEstimate } from "../types";
import { calculateEstimate } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateAIEstimate(input: ProjectInput): Promise<ProjectEstimate> {
  const baseEstimate = calculateEstimate(input);
  
  const prompt = `
You are the BuildOS Africa Cost Intelligence Engine.
Refine the following construction estimate for a project in ${input.location}, Nigeria.

Project Details:
- Name: ${input.name}
- Type: ${input.buildingType}
- Scale: ${input.floors} floors, ${input.bedrooms} bedrooms, ${input.builtUpArea} sqm
- Finish: ${input.finishLevel}
- Features: ${input.optionalFeatures.join(', ')}
- Notes: ${input.notes}

Base Estimate:
- Total Cost: ₦${baseEstimate.totalCost.toLocaleString()}
- Materials: ${baseEstimate.materials.map(m => `${m.name}: ${m.quantity} ${m.unit}`).join(', ')}

Provide a refined estimate in JSON format.
Adjust costs based on current Nigerian market realities (inflation, exchange rates).
Provide 4-6 strategic planning insights.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          totalCost: { type: Type.NUMBER },
          breakdown: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                value: { type: Type.NUMBER }
              },
              required: ["name", "value"]
            }
          },
          materials: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                quantity: { type: Type.NUMBER },
                unit: { type: Type.STRING }
              },
              required: ["name", "quantity", "unit"]
            }
          },
          insights: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          phases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                duration: { type: Type.NUMBER },
                description: { type: Type.STRING }
              },
              required: ["name", "duration", "description"]
            }
          }
        },
        required: ["totalCost", "breakdown", "materials", "insights", "phases"]
      }
    }
  });

  return JSON.parse(response.text);
}
