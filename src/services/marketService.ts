import { GoogleGenAI, Type } from "@google/genai";
import { MaterialIntelligence, ProjectEstimate } from "../types";

const MARKET_SYSTEM_INSTRUCTION = `
You are the BuildOS Africa Live Material Price Intelligence Engine.

Your role is to analyze construction material price data collected from multiple suppliers and produce market price intelligence.

You will receive a list of supplier prices for each material.

Your task is to:
1. calculate the minimum market price
2. calculate the average market price
3. calculate the maximum market price
4. detect price trends if historical data exists
5. identify unusual pricing patterns
6. summarize market insights

Your output must include:
- materialName
- minPrice
- avgPrice
- maxPrice
- trend (Rising, Stable, Falling)
- insight (short explanation about current market movement)

Use professional language suitable for developers and builders.
Never invent unrealistic price movements.
Keep outputs concise and clear.
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateMarketIntelligence(
  estimate: ProjectEstimate
): Promise<MaterialIntelligence[]> {
  // We'll focus on the top 4 materials from the estimate
  const topMaterials = estimate.materials.slice(0, 4).map(m => m.name);
  
  const prompt = `
Analyze the following materials for the Nigerian construction market:
${topMaterials.join(', ')}

Provide market intelligence based on current (March 2026) trends in Nigeria.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: MARKET_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            materialName: { type: Type.STRING },
            minPrice: { type: Type.NUMBER },
            avgPrice: { type: Type.NUMBER },
            maxPrice: { type: Type.NUMBER },
            trend: { type: Type.STRING, enum: ["Rising", "Stable", "Falling"] },
            insight: { type: Type.STRING }
          },
          required: ["materialName", "minPrice", "avgPrice", "maxPrice", "trend", "insight"]
        }
      }
    }
  });

  return JSON.parse(response.text);
}
