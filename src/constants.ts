import { ProjectInput, ProjectEstimate, FinishLevel } from './types';

export const BASE_COSTS: Record<FinishLevel, number> = {
  'Standard': 280000,
  'Premium': 420000,
  'Luxury': 650000,
};

export const LOCATION_MULTIPLIERS: Record<string, number> = {
  'Lagos': 1.15,
  'Abuja': 1.12,
  'Port Harcourt': 1.10,
  'Ibadan': 0.95,
  'Enugu': 0.97,
  'Kano': 0.96,
  'Owerri': 1.00,
  'Uyo': 1.02,
  'Other': 1.00,
};

export const OPTIONAL_FEATURES: Record<string, number> = {
  'Boys Quarter': 8500000,
  'Penthouse': 18000000,
  'Swimming Pool': 15000000,
  'Elevator': 22000000,
};

export const COST_BREAKDOWN_PCT = [
  { name: 'Foundation', pct: 0.15 },
  { name: 'Superstructure', pct: 0.20 },
  { name: 'Roofing', pct: 0.10 },
  { name: 'Electrical', pct: 0.08 },
  { name: 'Plumbing', pct: 0.07 },
  { name: 'Finishing', pct: 0.25 },
  { name: 'External Works', pct: 0.08 },
  { name: 'Contingency', pct: 0.07 },
];

export const calculateEstimate = (input: ProjectInput): ProjectEstimate => {
  const baseRate = BASE_COSTS[input.finishLevel];
  const locationMult = LOCATION_MULTIPLIERS[input.location] || 1.00;
  
  let totalCost = input.builtUpArea * baseRate * locationMult;
  
  input.optionalFeatures.forEach(feature => {
    totalCost += OPTIONAL_FEATURES[feature] || 0;
  });

  const breakdown = COST_BREAKDOWN_PCT.map(item => ({
    name: item.name,
    value: Math.round(totalCost * item.pct),
  }));

  // Simple material estimation logic
  const materials = [
    { name: 'Blocks (9-inch)', quantity: Math.round(input.builtUpArea * 45), unit: 'Units' },
    { name: 'Cement', quantity: Math.round(input.builtUpArea * 1.2), unit: 'Bags' },
    { name: 'Sand (Sharp)', quantity: Math.round(input.builtUpArea * 0.15), unit: 'Tons' },
    { name: 'Granite', quantity: Math.round(input.builtUpArea * 0.12), unit: 'Tons' },
    { name: 'Steel Reinforcement', quantity: Math.round(input.builtUpArea * 0.045), unit: 'Tons' },
    { name: 'Roof Sheets', quantity: Math.round(input.builtUpArea * 1.4), unit: 'SQM' },
    { name: 'Doors', quantity: Math.round(input.bedrooms + input.bathrooms + 4), unit: 'Units' },
    { name: 'Windows', quantity: Math.round(input.builtUpArea / 15), unit: 'Units' },
    { name: 'Paint', quantity: Math.round(input.builtUpArea * 0.8), unit: 'Litres' },
    { name: 'Tiles', quantity: Math.round(input.builtUpArea * 1.15), unit: 'SQM' },
  ];

  const insights = [
    `The ${input.finishLevel} finish in ${input.location} is the primary cost driver.`,
    `Built-up area of ${input.builtUpArea} sqm requires significant structural reinforcement.`,
    input.optionalFeatures.length > 0 ? `Optional features add ₦${input.optionalFeatures.reduce((acc, f) => acc + (OPTIONAL_FEATURES[f] || 0), 0).toLocaleString()} to the base budget.` : 'No high-cost optional features detected.',
    'Timeline risk is moderate due to current supply chain volatility in Nigeria.',
  ];

  const phases = [
    { name: 'Substructure', duration: 4, description: 'Excavation, foundation, and ground floor slab.' },
    { name: 'Superstructure', duration: 8, description: 'Blockwork, lintels, and columns for all floors.' },
    { name: 'Roofing & Carcass', duration: 3, description: 'Roof trusses, sheets, and basic plumbing/electrical piping.' },
    { name: 'Finishing & MEP', duration: 12, description: 'Plastering, tiling, painting, and final installations.' },
  ];

  return {
    totalCost: Math.round(totalCost),
    breakdown,
    materials,
    insights,
    phases,
  };
};

export const SAMPLE_PROJECTS: ProjectInput[] = [
  {
    id: '1',
    name: 'Lekki Contemporary Villa',
    buildingType: 'Duplex',
    floors: 2,
    bedrooms: 5,
    bathrooms: 6,
    landSize: 600,
    builtUpArea: 450,
    location: 'Lagos',
    finishLevel: 'Luxury',
    optionalFeatures: ['Swimming Pool', 'Penthouse'],
    notes: 'Modern minimalist design with large glass windows.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Abuja Family Residence',
    buildingType: 'Bungalow',
    floors: 1,
    bedrooms: 3,
    bathrooms: 4,
    landSize: 800,
    builtUpArea: 220,
    location: 'Abuja',
    finishLevel: 'Premium',
    optionalFeatures: ['Boys Quarter'],
    notes: 'Traditional northern architecture with modern interiors.',
    createdAt: new Date().toISOString(),
  }
];
