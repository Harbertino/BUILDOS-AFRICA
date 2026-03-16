import React, { useState } from 'react';
import { Sidebar, Card, Badge, SectionHeader, MetricCard } from './components/Layout';
import { SmartCityInput, SmartCitySimulation } from './types';
import { simulateSmartCity } from './services/smartCityService';
import { 
  Globe, 
  Users, 
  Zap, 
  Droplets, 
  Route, 
  TreePine, 
  Construction, 
  BarChart3, 
  Loader2,
  ArrowRight,
  ChevronRight,
  Leaf,
  Map,
  Layers,
  Building2,
  Milestone,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SmartCityEngine = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulation, setSimulation] = useState<SmartCitySimulation | null>(null);
  const [input, setInput] = useState<SmartCityInput>({
    projectName: '',
    landArea: 50,
    location: '',
    zoningType: 'Mixed-Use',
    targetDensity: 'Medium',
    avgPlotSize: 450,
    heightLimits: 4,
    developmentGoals: ['Sustainability', 'Affordability', 'Smart Infrastructure']
  });

  const handleSimulate = async () => {
    if (!input.projectName || !input.location) return;
    setIsSimulating(true);
    try {
      const result = await simulateSmartCity(input);
      setSimulation(result);
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-ink text-white">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <SectionHeader 
          title="AI Smart City Development Engine" 
          subtitle="Simulate large-scale housing estates and urban developments with AI-driven intelligence."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Input Panel */}
          <Card className="lg:col-span-1 border-white/10">
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
              <Map className="w-5 h-5 text-brand-gold" /> Parameters
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Project Name</label>
                <input 
                  type="text" 
                  value={input.projectName}
                  onChange={(e) => setInput({...input, projectName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none transition-all"
                  placeholder="e.g. Eko Atlantic Extension"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Land Area (Ha)</label>
                  <input 
                    type="number" 
                    value={input.landArea}
                    onChange={(e) => setInput({...input, landArea: Number(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Zoning</label>
                  <select 
                    value={input.zoningType}
                    onChange={(e) => setInput({...input, zoningType: e.target.value as any})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none transition-all"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Mixed-Use">Mixed-Use</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Location</label>
                <input 
                  type="text" 
                  value={input.location}
                  onChange={(e) => setInput({...input, location: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none transition-all"
                  placeholder="e.g. Ibeju-Lekki, Lagos"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Density</label>
                  <select 
                    value={input.targetDensity}
                    onChange={(e) => setInput({...input, targetDensity: e.target.value as any})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Height Limit</label>
                  <input 
                    type="number" 
                    value={input.heightLimits}
                    onChange={(e) => setInput({...input, heightLimits: Number(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={isSimulating || !input.projectName || !input.location}
              onClick={handleSimulate}
              className="btn-primary w-full mt-10 py-4 flex items-center justify-center gap-2"
            >
              {isSimulating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Simulating Urban Layout...
                </>
              ) : (
                <>
                  <Globe className="w-5 h-5" /> Run Urban Simulation
                </>
              )}
            </button>
          </Card>

          {/* Simulation Status / Visual Placeholder */}
          <Card className="lg:col-span-2 border-white/10 bg-brand-gold/5 relative overflow-hidden flex flex-col items-center justify-center text-center p-12">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Layers className="w-64 h-64 text-brand-gold" />
            </div>
            {!simulation ? (
              <div className="relative z-10">
                <div className="w-24 h-24 rounded-full bg-brand-gold/10 flex items-center justify-center mb-8 mx-auto border border-brand-gold/20 animate-pulse">
                  <Globe className="w-12 h-12 text-brand-gold" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Urban Development Simulator</h3>
                <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                  Enter your land parameters and development goals to generate a complete urban layout simulation, infrastructure forecast, and cost analysis.
                </p>
              </div>
            ) : (
              <div className="relative z-10 w-full text-left">
                <Badge variant="gold" className="mb-4">Simulation Complete</Badge>
                <h3 className="text-3xl font-display font-bold mb-6">{simulation.overview.split('.')[0]}.</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Housing Units</p>
                    <p className="text-xl font-bold text-white">{simulation.housingCapacity.totalUnits.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Population</p>
                    <p className="text-xl font-bold text-white">{simulation.housingCapacity.estimatedPopulation.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Cost</p>
                    <p className="text-xl font-bold text-brand-gold">₦{(simulation.costEstimate.total / 1000000000).toFixed(1)}B</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Green Ratio</p>
                    <p className="text-xl font-bold text-emerald-400">{simulation.environmentalInsights.greenSpaceRatio}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        <AnimatePresence>
          {simulation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Housing Capacity */}
                <Card className="border-brand-blue/20">
                  <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-3">
                    <Users className="w-6 h-6 text-brand-blue" /> Housing Capacity Estimate
                  </h3>
                  <div className="space-y-6">
                    {simulation.housingCapacity.breakdown.map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-sm font-bold text-white">{item.type}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-slate-400">{item.count} Units</span>
                          <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-brand-blue" 
                              style={{ width: `${(item.count / simulation.housingCapacity.totalUnits) * 100}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Infrastructure Forecast */}
                <Card className="border-brand-gold/20">
                  <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-brand-gold" /> Infrastructure Forecast
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <Zap className="w-5 h-5 text-brand-gold mb-4" />
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Power Requirement</p>
                      <p className="text-sm text-white font-bold">{simulation.infrastructureForecast.powerRequired}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <Droplets className="w-5 h-5 text-brand-blue mb-4" />
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Water Supply</p>
                      <p className="text-sm text-white font-bold">{simulation.infrastructureForecast.waterRequired}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <Route className="w-5 h-5 text-slate-400 mb-4" />
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Road Network</p>
                      <p className="text-sm text-white font-bold">{simulation.infrastructureForecast.roadNetwork}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <Building2 className="w-5 h-5 text-brand-gold mb-4" />
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Public Facilities</p>
                      <p className="text-sm text-white font-bold">{simulation.infrastructureForecast.publicFacilities.length} Major Facilities</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Cost & Environmental */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                  <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-brand-gold" /> Development Cost
                  </h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Land Prep</span>
                      <span className="text-sm font-bold text-white">₦{simulation.costEstimate.landPrep.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Infrastructure</span>
                      <span className="text-sm font-bold text-white">₦{simulation.costEstimate.infrastructure.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Construction</span>
                      <span className="text-sm font-bold text-white">₦{simulation.costEstimate.construction.toLocaleString()}</span>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <span className="text-sm font-bold text-brand-gold">Total Estimate</span>
                      <span className="text-xl font-display font-bold text-white">₦{simulation.costEstimate.total.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>

                <Card className="lg:col-span-2 border-emerald-400/20 bg-emerald-400/5">
                  <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-3">
                    <Leaf className="w-6 h-6 text-emerald-400" /> Environmental Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="mb-8">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Carbon Footprint Analysis</p>
                        <p className="text-sm text-slate-300 italic">"{simulation.environmentalInsights.carbonFootprint}"</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Green Space Ratio</p>
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-display font-bold text-emerald-400">{simulation.environmentalInsights.greenSpaceRatio}</span>
                          <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400" style={{ width: simulation.environmentalInsights.greenSpaceRatio }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sustainability Recommendations</p>
                      {simulation.environmentalInsights.sustainabilityRecommendations.map((rec, i) => (
                        <div key={i} className="flex gap-3 text-xs text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Phasing Plan */}
              <Card>
                <h3 className="text-xl font-display font-bold mb-10 flex items-center gap-3">
                  <Milestone className="w-6 h-6 text-brand-gold" /> Phased Development Strategy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {simulation.phasingPlan.map((phase, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -left-4 top-0 bottom-0 w-px bg-white/5 group-hover:bg-brand-gold/30 transition-colors" />
                      <div className="mb-6">
                        <Badge variant="gold" className="mb-3">{phase.phase}</Badge>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{phase.duration}</p>
                        <h4 className="text-lg font-display font-bold text-white mb-4">{phase.focus}</h4>
                      </div>
                      <ul className="space-y-3">
                        {phase.milestones.map((m, mi) => (
                          <li key={mi} className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
                            <ChevronRight className="w-3 h-3 text-brand-gold shrink-0 mt-0.5" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SmartCityEngine;
