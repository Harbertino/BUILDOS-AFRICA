import { GoogleGenAI, Type } from "@google/genai";
import { ProcurementAnalysis, SupplierBid, MaterialIntelligence } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const analyzeProcurementBids = async (
  bids: SupplierBid[],
  marketIntelligence: MaterialIntelligence[],
  quantity: number,
  materialName: string
): Promise<ProcurementAnalysis> => {
  const prompt = `
    Analyze these supplier bids for ${quantity} units of ${materialName}.
    
    Supplier Bids:
    ${JSON.stringify(bids, null, 2)}
    
    Market Price Intelligence:
    ${JSON.stringify(marketIntelligence, null, 2)}
    
    Consider:
    - Unit price vs Market Average
    - Delivery timelines
    - Supplier reputation (rating)
    - Logistics cost (assume 5% of total if not specified, or use your knowledge of Nigerian logistics)
    
    Generate a detailed procurement analysis in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          comparisonTable: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                supplier: { type: Type.STRING },
                price: { type: Type.NUMBER },
                delivery: { type: Type.STRING },
                reputation: { type: Type.NUMBER },
                logistics: { type: Type.NUMBER },
                totalScore: { type: Type.NUMBER }
              },
              required: ["supplier", "price", "delivery", "reputation", "logistics", "totalScore"]
            }
          },
          marketBenchmark: {
            type: Type.OBJECT,
            properties: {
              material: { type: Type.STRING },
              marketAvg: { type: Type.NUMBER },
              currentBest: { type: Type.NUMBER },
              variance: { type: Type.NUMBER }
            },
            required: ["material", "marketAvg", "currentBest", "variance"]
          },
          bestOfferCandidate: {
            type: Type.OBJECT,
            properties: {
              supplier: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["supplier", "reason"]
          },
          negotiationStrategy: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          suggestedCounteroffers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                supplier: { type: Type.STRING },
                targetPrice: { type: Type.NUMBER },
                justification: { type: Type.STRING }
              },
              required: ["supplier", "targetPrice", "justification"]
            }
          },
          riskSignals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                message: { type: Type.STRING }
              },
              required: ["type", "message"]
            }
          }
        },
        required: [
          "summary", 
          "comparisonTable", 
          "marketBenchmark", 
          "bestOfferCandidate", 
          "negotiationStrategy", 
          "suggestedCounteroffers", 
          "riskSignals"
        ]
      }
    }
  });

  return JSON.parse(response.text);
};
