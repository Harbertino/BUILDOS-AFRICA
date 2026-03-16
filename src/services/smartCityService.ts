import { GoogleGenAI, Type } from "@google/genai";
import { SmartCityInput, SmartCitySimulation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const simulateSmartCity = async (input: SmartCityInput): Promise<SmartCitySimulation> => {
  const prompt = `
    Simulate a large-scale urban development based on these parameters:
    
    Project Name: ${input.projectName}
    Land Area: ${input.landArea} Hectares
    Location: ${input.location}
    Zoning Type: ${input.zoningType}
    Target Housing Density: ${input.targetDensity}
    Average Plot Size: ${input.avgPlotSize} sqm
    Building Height Limits: ${input.heightLimits} Floors
    Development Goals: ${input.developmentGoals.join(", ")}
    
    Generate a comprehensive urban development simulation in JSON format.
    Include:
    - Urban Development Overview
    - Housing Capacity Estimate (total units, breakdown, population)
    - Infrastructure Forecast (power, water, roads, waste, facilities)
    - Development Cost Estimate (land prep, infrastructure, construction, total)
    - Environmental Planning Insights (green space, carbon footprint, sustainability)
    - Development Phasing Plan (phases, duration, focus, milestones)
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overview: { type: Type.STRING },
          housingCapacity: {
            type: Type.OBJECT,
            properties: {
              totalUnits: { type: Type.NUMBER },
              breakdown: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING },
                    count: { type: Type.NUMBER }
                  },
                  required: ["type", "count"]
                }
              },
              estimatedPopulation: { type: Type.NUMBER }
            },
            required: ["totalUnits", "breakdown", "estimatedPopulation"]
          },
          infrastructureForecast: {
            type: Type.OBJECT,
            properties: {
              powerRequired: { type: Type.STRING },
              waterRequired: { type: Type.STRING },
              roadNetwork: { type: Type.STRING },
              wasteManagement: { type: Type.STRING },
              publicFacilities: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["powerRequired", "waterRequired", "roadNetwork", "wasteManagement", "publicFacilities"]
          },
          costEstimate: {
            type: Type.OBJECT,
            properties: {
              landPrep: { type: Type.NUMBER },
              infrastructure: { type: Type.NUMBER },
              construction: { type: Type.NUMBER },
              total: { type: Type.NUMBER }
            },
            required: ["landPrep", "infrastructure", "construction", "total"]
          },
          environmentalInsights: {
            type: Type.OBJECT,
            properties: {
              greenSpaceRatio: { type: Type.STRING },
              carbonFootprint: { type: Type.STRING },
              sustainabilityRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["greenSpaceRatio", "carbonFootprint", "sustainabilityRecommendations"]
          },
          phasingPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING },
                duration: { type: Type.STRING },
                focus: { type: Type.STRING },
                milestones: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["phase", "duration", "focus", "milestones"]
            }
          }
        },
        required: [
          "overview", 
          "housingCapacity", 
          "infrastructureForecast", 
          "costEstimate", 
          "environmentalInsights", 
          "phasingPlan"
        ]
      }
    }
  });

  return JSON.parse(response.text);
};
