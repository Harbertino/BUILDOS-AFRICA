import { GoogleGenAI, Type } from "@google/genai";
import { ProjectInput, DesignImprovements, StructuralReview } from "../types";

const DESIGN_SYSTEM_INSTRUCTION = `
You are the BuildOS Africa Design Improvement Recommendation Engine.

Your role is to review a building layout interpretation and generate intelligent architectural improvement recommendations.

You are not redesigning the project from scratch.
You are improving clarity, functionality, elegance, and buildability.

YOUR TASK
Recommend practical design improvements in the areas of:
- spatial planning
- circulation efficiency
- facade simplicity
- room proportion balance
- staircase optimization
- wet-area stacking
- natural lighting
- ventilation logic
- luxury positioning where relevant
- buildability

RULES
- Recommendations must be realistic
- Keep them concise and high-value
- Avoid generic advice
- Tie recommendations to the actual project profile
- Balance elegance with practical construction logic
- If the project is premium or luxury, recommendations should preserve premium character while improving efficiency
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateDesignImprovements(
  input: ProjectInput, 
  structuralReview?: StructuralReview
): Promise<DesignImprovements> {
  const prompt = `
Building Type: ${input.buildingType}
Floors: ${input.floors}
Bedrooms: ${input.bedrooms}
Bathrooms: ${input.bathrooms}
Built-up Area: ${input.builtUpArea} sqm
Finish Level: ${input.finishLevel}
Optional Features: ${input.optionalFeatures?.join(', ') || 'None'}
Identified Inefficiencies (from structural review): ${structuralReview?.inefficiencies.map(i => i.title).join(', ') || 'None'}
Project Goals: ${input.additionalNotes || 'Standard residential development'}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: DESIGN_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          spatial: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2 to 4 recommendations for spatial planning"
          },
          functional: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2 to 4 recommendations for functional improvements"
          },
          aesthetic: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2 to 3 recommendations for aesthetic / facade improvements"
          },
          buildability: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "2 to 3 recommendations for buildability improvements"
          },
          priorityActions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List the 3 most important changes first"
          }
        },
        required: ["spatial", "functional", "aesthetic", "buildability", "priorityActions"]
      }
    }
  });

  return JSON.parse(response.text);
}
