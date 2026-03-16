import { GoogleGenAI, Type } from "@google/genai";
import { ProjectInput, BuildingVisualization } from "../types";

const VISUALIZATION_SYSTEM_INSTRUCTION = `
You are the BuildOS Africa 3D Building Preview Engine.

Your role is to convert interpreted floor plan data and architectural project details into a professional conceptual 3D building preview description.

You are not a casual chatbot.
You are an AI architectural visualization planning engine.

Your output must help generate:
1. a realistic conceptual building massing description
2. facade direction
3. roof style guidance
4. architectural style interpretation
5. exterior material suggestions
6. rendering instructions for a 3D preview tool or image generation engine

YOUR TASK
Interpret the building profile and produce a coherent 3D preview concept.

You should define:
- likely massing form
- facade expression
- entrance emphasis
- window rhythm
- balcony or terrace treatment
- roof form
- materiality
- luxury level expression
- compound context where relevant

STYLE INTERPRETATION RULES
If the project appears premium or luxury:
- use sharper facade detailing
- stronger glazing language
- cleaner geometric lines
- elegant modern rooflines
- premium material recommendations

If the project appears standard residential:
- use simpler forms
- practical roof design
- modest facade articulation
- cost-efficient material recommendations

IMPORTANT RULES
- Keep outputs architecturally believable
- Do not invent impossible forms
- Stay aligned with the building type and project scale
- Keep language premium and professional
- Make the output suitable for concept rendering workflows
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateVisualizationConcept(input: ProjectInput): Promise<BuildingVisualization> {
  const prompt = `
Project Name: ${input.name}
Building Type: ${input.buildingType}
Number of Floors: ${input.floors}
Room Distribution: ${input.bedrooms} Bedrooms, ${input.bathrooms} Bathrooms
Estimated Built-up Area: ${input.builtUpArea} sqm
Finish Level: ${input.finishLevel}
Project Location: ${input.location}
Optional Features: ${input.optionalFeatures?.join(', ') || 'None'}
Architectural Notes: ${input.additionalNotes || 'None'}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: VISUALIZATION_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.OBJECT,
            properties: {
              style: { type: Type.STRING },
              massing: { type: Type.STRING },
              facade: { type: Type.STRING },
              roof: { type: Type.STRING },
              palette: { type: Type.STRING },
              features: { type: Type.STRING },
              site: { type: Type.STRING }
            },
            required: ["style", "massing", "facade", "roof", "palette", "features", "site"]
          },
          description: { type: Type.STRING },
          renderingDirection: {
            type: Type.OBJECT,
            properties: {
              camera: { type: Type.STRING },
              style: { type: Type.STRING },
              materials: { type: Type.STRING },
              lighting: { type: Type.STRING },
              environment: { type: Type.STRING },
              realism: { type: Type.STRING }
            },
            required: ["camera", "style", "materials", "lighting", "environment", "realism"]
          }
        },
        required: ["summary", "description", "renderingDirection"]
      }
    }
  });

  return JSON.parse(response.text);
}
