/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BuildingType = string;
export type FinishLevel = 'Standard' | 'Premium' | 'Luxury';
export type Location = string;

export interface ProjectInput {
  id: string;
  name: string;
  buildingType: string;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  location: string;
  finishLevel: FinishLevel;
  builtUpArea: number;
  optionalFeatures: string[];
  // Legacy fields for backward compatibility
  hasBoysQuarter?: boolean;
  hasPenthouse?: boolean;
  hasSwimmingPool?: boolean;
  hasElevator?: boolean;
  additionalNotes?: string;
  createdAt: string;
}

export interface CostItem {
  name: string;
  value: number;
}

export interface MaterialItem {
  name: string;
  quantity: number;
  unit: string;
}

export interface ProjectPhase {
  name: string;
  duration: number; // in weeks
  description: string;
}

export interface ProjectEstimate {
  totalCost: number;
  breakdown: CostItem[];
  materials: MaterialItem[];
  phases: ProjectPhase[];
  insights: string[];
  visualization?: BuildingVisualization;
  structuralReview?: StructuralReview;
  designImprovements?: DesignImprovements;
  costOptimization?: CostOptimization;
  marketIntelligence?: MaterialIntelligence[];
}

export interface MarketplaceMaterial {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  unit: string;
  tiers: { minQuantity: number; price: number }[];
  supplier: string;
  rating: number;
  stock: number;
}

export interface SupplierBid {
  id: string;
  requestId: string;
  supplierName: string;
  price: number;
  deliveryTime: string;
  availability: boolean;
  rating: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface MaterialRequest {
  id: string;
  material: string;
  quantity: number;
  location: string;
  deliveryDate: string;
  projectRef: string;
  status: 'open' | 'closed';
  bids: SupplierBid[];
}

export interface EquipmentRental {
  id: string;
  type: string;
  pricePerDay: number;
  location: string;
  availability: boolean;
  operatorIncluded: boolean;
  supplier: string;
  image?: string;
}

export interface MarketplaceOrder {
  id: string;
  type: 'material' | 'equipment';
  itemName: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  escrowStatus: 'held' | 'released' | 'refunded';
  deliveryDate: string;
  logistics?: {
    truckType: string;
    trips: number;
    estTime: string;
    estCost: number;
  };
}

export interface EscrowTransaction {
  id: string;
  orderId: string;
  amount: number;
  type: 'payment' | 'release' | 'refund';
  date: string;
  status: 'completed' | 'pending';
}

export interface MaterialIntelligence {
  materialName: string;
  minPrice: number;
  avgPrice: number;
  maxPrice: number;
  trend: 'Rising' | 'Stable' | 'Falling';
  insight: string;
}

export interface CostOptimization {
  pressurePoints: string[];
  savingsOpportunities: {
    recommendation: string;
    reason: string;
    area: string;
  }[];
  lowImpactCuts: string[];
  highImpactDecisions: string[];
}

export interface DesignImprovements {
  spatial: string[];
  functional: string[];
  aesthetic: string[];
  buildability: string[];
  priorityActions: string[];
}

export interface StructuralReview {
  summary: {
    complexityLevel: string;
    buildabilityAssessment: string;
    executionRiskLevel: string;
  };
  inefficiencies: {
    title: string;
    reason: string;
    implication: string;
  }[];
}

export interface BuildingVisualization {
  summary: {
    style: string;
    massing: string;
    facade: string;
    roof: string;
    palette: string;
    features: string;
    site: string;
  };
  description: string;
  renderingDirection: {
    camera: string;
    style: string;
    materials: string;
    lighting: string;
    environment: string;
    realism: string;
  };
}

export interface Project {
  input: ProjectInput;
  estimate: ProjectEstimate;
}

export interface ProcurementAnalysis {
  summary: string;
  comparisonTable: {
    supplier: string;
    price: number;
    delivery: string;
    reputation: number;
    logistics: number;
    totalScore: number;
  }[];
  marketBenchmark: {
    material: string;
    marketAvg: number;
    currentBest: number;
    variance: number;
  };
  bestOfferCandidate: {
    supplier: string;
    reason: string;
  };
  negotiationStrategy: string[];
  suggestedCounteroffers: {
    supplier: string;
    targetPrice: number;
    justification: string;
  }[];
  riskSignals: {
    type: 'High' | 'Medium' | 'Low';
    message: string;
  }[];
}

export interface LoanRequest {
  id: string;
  projectId: string;
  projectName: string;
  location: string;
  totalCost: number;
  requestedAmount: number;
  equityContribution: number;
  timeline: string;
  contractorProfile: {
    name: string;
    reputationScore: number;
    completedProjects: number;
  };
  procurementPlan: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  readinessScore: number;
  riskAssessment: {
    score: number;
    level: 'Low' | 'Medium' | 'High';
    factors: {
      category: string;
      impact: string;
      mitigation: string;
    }[];
  };
  milestones: DrawdownMilestone[];
}

export interface DrawdownMilestone {
  id: string;
  stage: string;
  percentage: number;
  amount: number;
  status: 'pending' | 'released' | 'locked';
  requirements: string[];
}

export interface LoanOffer {
  id: string;
  lenderName: string;
  amount: number;
  interestRate: number;
  tenure: string;
  repaymentTerms: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface SmartCityInput {
  projectName: string;
  landArea: number; // in hectares
  location: string;
  zoningType: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Industrial';
  targetDensity: 'Low' | 'Medium' | 'High';
  avgPlotSize: number;
  heightLimits: number;
  developmentGoals: string[];
}

export interface SmartCitySimulation {
  overview: string;
  housingCapacity: {
    totalUnits: number;
    breakdown: { type: string; count: number }[];
    estimatedPopulation: number;
  };
  infrastructureForecast: {
    powerRequired: string;
    waterRequired: string;
    roadNetwork: string;
    wasteManagement: string;
    publicFacilities: string[];
  };
  costEstimate: {
    landPrep: number;
    infrastructure: number;
    construction: number;
    total: number;
  };
  environmentalInsights: {
    greenSpaceRatio: string;
    carbonFootprint: string;
    sustainabilityRecommendations: string[];
  };
  phasingPlan: {
    phase: string;
    duration: string;
    focus: string;
    milestones: string[];
  }[];
}
