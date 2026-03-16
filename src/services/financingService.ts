import { GoogleGenAI, Type } from "@google/genai";
import { LoanRequest, Project, DrawdownMilestone } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const analyzeFinancingReadiness = async (
  project: Project,
  requestedAmount: number,
  equityContribution: number
): Promise<Partial<LoanRequest>> => {
  const prompt = `
    Analyze this construction project for financing readiness and risk.
    
    Project Details:
    ${JSON.stringify(project, null, 2)}
    
    Financing Request:
    - Requested Amount: ₦${requestedAmount.toLocaleString()}
    - Developer Equity: ₦${equityContribution.toLocaleString()}
    
    Consider:
    - Project complexity vs Location risk
    - Cost realism (BuildOS Cost Intelligence)
    - Contractor reliability (BuildOS Reputation Engine)
    - Procurement planning (BuildOS Marketplace)
    
    Generate a financing readiness score (0-100), a risk assessment, and milestone-based drawdown phases.
    The response must be in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          readinessScore: { type: Type.NUMBER },
          riskAssessment: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              level: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
              factors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    impact: { type: Type.STRING },
                    mitigation: { type: Type.STRING }
                  },
                  required: ["category", "impact", "mitigation"]
                }
              }
            },
            required: ["score", "level", "factors"]
          },
          milestones: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stage: { type: Type.STRING },
                percentage: { type: Type.NUMBER },
                requirements: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["stage", "percentage", "requirements"]
            }
          }
        },
        required: ["readinessScore", "riskAssessment", "milestones"]
      }
    }
  });

  const analysis = JSON.parse(response.text);
  
  // Map milestones to include IDs and amounts
  const milestones: DrawdownMilestone[] = analysis.milestones.map((m: any, i: number) => ({
    id: `MS-${i + 1}`,
    stage: m.stage,
    percentage: m.percentage,
    amount: (requestedAmount * m.percentage) / 100,
    status: i === 0 ? 'pending' : 'locked',
    requirements: m.requirements
  }));

  return {
    readinessScore: analysis.readinessScore,
    riskAssessment: analysis.riskAssessment,
    milestones
  };
};

export const mockLoanOffers = [
  {
    id: 'OFF-101',
    lenderName: 'Standard Chartered Africa',
    amount: 85000000,
    interestRate: 14.5,
    tenure: '24 Months',
    repaymentTerms: 'Quarterly interest-only during construction, principal + interest post-completion.',
    status: 'pending'
  },
  {
    id: 'OFF-102',
    lenderName: 'Access Bank Construction Finance',
    amount: 80000000,
    interestRate: 15.2,
    tenure: '18 Months',
    repaymentTerms: 'Monthly interest payments, balloon principal payment at 18 months.',
    status: 'pending'
  },
  {
    id: 'OFF-103',
    lenderName: 'BuildOS Capital Fund',
    amount: 90000000,
    interestRate: 13.8,
    tenure: '36 Months',
    repaymentTerms: 'Flexible drawdown-linked repayment schedule.',
    status: 'pending'
  }
];
