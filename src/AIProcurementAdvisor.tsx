import React, { useState } from 'react';
import { Sidebar, Card, Badge, SectionHeader, MetricCard } from './components/Layout';
import { MaterialRequest, ProcurementAnalysis, MaterialIntelligence } from './types';
import { analyzeProcurementBids } from './services/procurementAdvisorService';
import { 
  BrainCircuit, 
  TrendingDown, 
  ShieldAlert, 
  CheckCircle2, 
  MessageSquareText, 
  ArrowRightLeft, 
  Loader2,
  Trophy,
  AlertTriangle,
  Info,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AIProcurementAdvisor = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ProcurementAnalysis | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<MaterialRequest | null>(null);

  // Mock data for requests (integration with BuildOS Marketplace Supplier Requests)
  const requests: MaterialRequest[] = [
    {
      id: 'REQ-501',
      material: 'Granite (3/4 inch)',
      quantity: 15,
      location: 'Victoria Island, Lagos',
      deliveryDate: '2026-03-25',
      projectRef: 'Ocean View Towers',
      status: 'open',
      bids: [
        {
          id: 'BID-901',
          requestId: 'REQ-501',
          supplierName: 'Granite Express',
          price: 165000,
          deliveryTime: '2 days',
          availability: true,
          rating: 4.6,
          status: 'pending'
        },
        {
          id: 'BID-902',
          requestId: 'REQ-501',
          supplierName: 'Quarry Direct',
          price: 162000,
          deliveryTime: '3 days',
          availability: true,
          rating: 4.2,
          status: 'pending'
        },
        {
          id: 'BID-903',
          requestId: 'REQ-501',
          supplierName: 'Lagos Aggregates',
          price: 170000,
          deliveryTime: '1 day',
          availability: true,
          rating: 4.9,
          status: 'pending'
        }
      ]
    }
  ];

  // Mock market intelligence (integration with BuildOS Live Material Price Engine)
  const marketIntelligence: MaterialIntelligence[] = [
    {
      materialName: 'Granite (3/4 inch)',
      minPrice: 155000,
      avgPrice: 168000,
      maxPrice: 185000,
      trend: 'Stable',
      insight: 'Prices are stable but logistics costs are rising due to fuel adjustments.'
    }
  ];

  const handleAnalyze = async () => {
    if (!selectedRequest) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeProcurementBids(
        selectedRequest.bids,
        marketIntelligence,
        selectedRequest.quantity,
        selectedRequest.material
      );
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-ink text-white">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <SectionHeader 
          title="AI Procurement Advisor" 
          subtitle="Intelligent bid analysis and negotiation strategy for construction procurement."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Request Selection */}
          <Card className="lg:col-span-1 border-white/10">
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-brand-gold" /> Active Requests
            </h3>
            <div className="space-y-4">
              {requests.map((req) => (
                <button
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedRequest?.id === req.id 
                      ? 'bg-brand-gold/10 border-brand-gold/50' 
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-white">{req.material}</span>
                    <Badge variant="blue">{req.bids.length} Bids</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">Project: {req.projectRef}</p>
                  <p className="text-xs text-slate-500">Qty: {req.quantity} Units</p>
                </button>
              ))}
            </div>

            <button
              disabled={!selectedRequest || isAnalyzing}
              onClick={handleAnalyze}
              className="btn-primary w-full mt-8 py-4 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Bids...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-5 h-5" /> Analyze Supplier Bids
                </>
              )}
            </button>
          </Card>

          {/* Market Context */}
          <Card className="lg:col-span-2 border-white/10 bg-brand-blue/5">
            <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-brand-blue" /> Market Intelligence
            </h3>
            {selectedRequest ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Live Price Benchmarks</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                      <span className="text-sm text-slate-400">Market Average</span>
                      <span className="text-lg font-bold text-white">₦168,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                      <span className="text-sm text-slate-400">Lowest Recorded</span>
                      <span className="text-lg font-bold text-emerald-400">₦155,000</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">AI Insight</p>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 h-full">
                    <p className="text-sm text-slate-300 leading-relaxed italic">
                      "Granite prices in the Lagos region are currently stable. However, logistics costs for VI deliveries are trending 12% higher due to bridge construction delays. Negotiate for inclusive delivery."
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                <Info className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">Select a request to view market context</p>
              </div>
            )}
          </Card>
        </div>

        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Summary & Best Candidate */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-emerald-400/20 bg-emerald-400/5">
                  <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" /> Procurement Summary
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {analysis.summary}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Market Benchmark</p>
                      <p className="text-lg font-bold text-white">₦{analysis.marketBenchmark.marketAvg.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Best</p>
                      <p className="text-lg font-bold text-emerald-400">₦{analysis.marketBenchmark.currentBest.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Price Variance</p>
                      <p className={`text-lg font-bold ${analysis.marketBenchmark.variance < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {analysis.marketBenchmark.variance}%
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-brand-gold/10 border-brand-gold/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Trophy className="w-24 h-24 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-4 text-brand-gold uppercase tracking-widest">Best Offer Candidate</h3>
                  <p className="text-2xl font-display font-bold text-white mb-2">{analysis.bestOfferCandidate.supplier}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {analysis.bestOfferCandidate.reason}
                  </p>
                  <button className="btn-primary w-full mt-8 py-3 text-xs">Accept Best Offer</button>
                </Card>
              </div>

              {/* Comparison Table */}
              <Card>
                <h3 className="text-xl font-display font-bold mb-8">Supplier Comparison Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Supplier</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bid Price</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Delivery</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reputation</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Logistics</th>
                        <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">AI Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {analysis.comparisonTable.map((row, i) => (
                        <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="py-6 text-sm font-bold text-white">{row.supplier}</td>
                          <td className="py-6 text-sm text-slate-300">₦{row.price.toLocaleString()}</td>
                          <td className="py-6 text-sm text-slate-400">{row.delivery}</td>
                          <td className="py-6">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold text-brand-gold">{row.reputation}</span>
                              <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-gold" style={{ width: `${(row.reputation / 5) * 100}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="py-6 text-sm text-slate-400">₦{row.logistics.toLocaleString()}</td>
                          <td className="py-6 text-right">
                            <span className="text-lg font-display font-bold text-brand-blue">{row.totalScore}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Strategy & Counteroffers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-brand-blue/20">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                    <MessageSquareText className="w-6 h-6 text-brand-blue" /> Negotiation Strategy
                  </h3>
                  <ul className="space-y-4">
                    {analysis.negotiationStrategy.map((step, i) => (
                      <li key={i} className="flex gap-4 text-sm text-slate-300 leading-relaxed">
                        <span className="w-6 h-6 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue font-bold shrink-0">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="border-brand-orange/20">
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                    <ArrowRightLeft className="w-6 h-6 text-brand-orange" /> Suggested Counteroffers
                  </h3>
                  <div className="space-y-4">
                    {analysis.suggestedCounteroffers.map((offer, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-sm font-bold text-white">{offer.supplier}</p>
                            <p className="text-xs text-slate-500">Target: <span className="text-brand-orange font-bold">₦{offer.targetPrice.toLocaleString()}</span></p>
                          </div>
                          <button className="btn-secondary py-2 px-4 text-[10px] border-brand-orange/30 text-brand-orange hover:bg-brand-orange/10">
                            Generate Counteroffer
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 italic leading-relaxed">
                          "{offer.justification}"
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Risk Signals */}
              <Card className="border-red-400/20 bg-red-400/5">
                <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-red-400" /> Procurement Risk Signals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analysis.riskSignals.map((risk, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        risk.type === 'High' ? 'bg-red-400/20 text-red-400' : 
                        risk.type === 'Medium' ? 'bg-brand-orange/20 text-brand-orange' : 
                        'bg-brand-blue/20 text-brand-blue'
                      }`}>
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-50">{risk.type} Risk</p>
                        <p className="text-sm text-slate-300">{risk.message}</p>
                      </div>
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

export default AIProcurementAdvisor;
