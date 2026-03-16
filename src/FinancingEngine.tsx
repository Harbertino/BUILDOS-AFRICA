import React, { useState } from 'react';
import { Sidebar, Card, Badge, SectionHeader, MetricCard } from './components/Layout';
import { Project, LoanRequest, LoanOffer, DrawdownMilestone } from './types';
import { analyzeFinancingReadiness, mockLoanOffers } from './services/financingService';
import { 
  Banknote, 
  ShieldCheck, 
  BarChart3, 
  Clock, 
  Users, 
  FileCheck2, 
  ArrowRight, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
  Unlock,
  ChevronRight,
  TrendingUp,
  Building2,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FinancingEngine = () => {
  const [view, setView] = useState<'developer' | 'lender'>('developer');
  const [isRequesting, setIsRequesting] = useState(false);
  const [activeRequest, setActiveRequest] = useState<LoanRequest | null>(null);
  const [offers] = useState<LoanOffer[]>(mockLoanOffers);

  // Mock project for integration context
  const mockProject: Project = {
    input: {
      id: 'PRJ-202',
      name: 'Lekki Heights Residential',
      buildingType: 'Apartment Complex',
      floors: 6,
      bedrooms: 24,
      bathrooms: 24,
      landSize: 1200,
      location: 'Lekki Phase 1, Lagos',
      finishLevel: 'Premium',
      builtUpArea: 3500,
      optionalFeatures: ['Swimming Pool', 'Elevator', 'Gym'],
      createdAt: '2026-03-10'
    },
    estimate: {
      totalCost: 125000000,
      breakdown: [
        { name: 'Substructure', value: 25000000 },
        { name: 'Superstructure', value: 45000000 },
        { name: 'Finishes', value: 35000000 },
        { name: 'Services', value: 20000000 }
      ],
      materials: [
        { name: 'Cement', quantity: 5000, unit: 'Bags' },
        { name: 'Steel', quantity: 45, unit: 'Tons' }
      ],
      phases: [
        { name: 'Foundation', duration: 8, description: 'Excavation and piling' },
        { name: 'Structural Frame', duration: 16, description: 'Columns, beams and slabs' }
      ],
      insights: ['Optimized concrete mix reduces cost by 8%']
    }
  };

  const handleRequestFinancing = async () => {
    setIsRequesting(true);
    try {
      const requestedAmount = 90000000;
      const equity = 35000000;
      
      const analysis = await analyzeFinancingReadiness(mockProject, requestedAmount, equity);
      
      const newRequest: LoanRequest = {
        id: 'REQ-' + Math.floor(Math.random() * 1000),
        projectId: mockProject.input.id,
        projectName: mockProject.input.name,
        location: mockProject.input.location,
        totalCost: mockProject.estimate.totalCost,
        requestedAmount,
        equityContribution: equity,
        timeline: '18 Months',
        contractorProfile: {
          name: 'BuildRight Construction Ltd',
          reputationScore: 4.8,
          completedProjects: 12
        },
        procurementPlan: 'BuildOS Managed Marketplace Procurement',
        status: 'pending',
        readinessScore: analysis.readinessScore || 0,
        riskAssessment: analysis.riskAssessment!,
        milestones: analysis.milestones || []
      };
      
      setActiveRequest(newRequest);
    } catch (error) {
      console.error('Financing request failed:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-ink text-white">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
          <SectionHeader 
            title="AI Construction Financing Engine" 
            subtitle="Intelligent capital deployment for high-impact construction projects."
          />
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button 
              onClick={() => setView('developer')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === 'developer' ? 'bg-brand-gold text-black' : 'text-slate-400 hover:text-white'}`}
            >
              Developer Portal
            </button>
            <button 
              onClick={() => setView('lender')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${view === 'lender' ? 'bg-brand-blue text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Lender Portal
            </button>
          </div>
        </div>

        {view === 'developer' ? (
          <div className="space-y-12">
            {/* Developer Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <MetricCard 
                label="Financing Readiness" 
                value={activeRequest ? `${activeRequest.readinessScore}%` : 'N/A'} 
                icon={ShieldCheck} 
                color="text-emerald-400"
              />
              <MetricCard 
                label="Requested Amount" 
                value={activeRequest ? `₦${(activeRequest.requestedAmount / 1000000).toFixed(1)}M` : '₦0'} 
                icon={Banknote} 
                color="text-brand-gold"
              />
              <MetricCard 
                label="Available Offers" 
                value={offers.length.toString()} 
                icon={FileCheck2} 
                color="text-brand-blue"
              />
              <MetricCard 
                label="Equity Ratio" 
                value={activeRequest ? `${((activeRequest.equityContribution / activeRequest.totalCost) * 100).toFixed(0)}%` : '0%'} 
                icon={PieChart} 
                color="text-slate-400"
              />
            </div>

            {!activeRequest ? (
              <Card className="flex flex-col items-center justify-center py-24 border-dashed border-white/10">
                <div className="w-20 h-20 rounded-3xl bg-brand-gold/10 flex items-center justify-center mb-8">
                  <Banknote className="w-10 h-10 text-brand-gold" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Ready to finance your project?</h3>
                <p className="text-slate-400 text-center max-w-md mb-10">
                  Leverage your BuildOS project intelligence to secure competitive construction financing from our network of institutional lenders.
                </p>
                <button 
                  onClick={handleRequestFinancing}
                  disabled={isRequesting}
                  className="btn-primary px-10 py-4 flex items-center gap-3"
                >
                  {isRequesting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Project Data...
                    </>
                  ) : (
                    <>
                      Request Construction Financing <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Request Details & Risk */}
                <div className="lg:col-span-2 space-y-8">
                  <Card className="border-emerald-400/20 bg-emerald-400/5">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <Badge variant="emerald" className="mb-4">AI Risk Assessment: {activeRequest.riskAssessment.level}</Badge>
                        <h3 className="text-2xl font-display font-bold">Financing Intelligence Report</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Project ID</p>
                        <p className="text-sm font-bold text-white">{activeRequest.projectId}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Risk Factors</p>
                        {activeRequest.riskAssessment.factors.map((f, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-sm font-bold text-white mb-1">{f.category}</p>
                            <p className="text-xs text-slate-400 mb-2">{f.impact}</p>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
                              <ShieldCheck className="w-3 h-3" /> Mitigation: {f.mitigation}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-6">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Project Profile</p>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-sm text-slate-400">Contractor</span>
                            <span className="text-sm font-bold text-white">{activeRequest.contractorProfile.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-sm text-slate-400">Reputation Score</span>
                            <span className="text-sm font-bold text-brand-gold">{activeRequest.contractorProfile.reputationScore}/5.0</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-sm text-slate-400">Construction Cost</span>
                            <span className="text-sm font-bold text-white">₦{activeRequest.totalCost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <span className="text-sm text-slate-400">Procurement Plan</span>
                            <span className="text-sm font-bold text-brand-blue">Marketplace Managed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Drawdown Milestones */}
                  <Card>
                    <h3 className="text-xl font-display font-bold mb-8 flex items-center gap-3">
                      <Clock className="w-6 h-6 text-brand-gold" /> Milestone-Based Drawdown Schedule
                    </h3>
                    <div className="space-y-6">
                      {activeRequest.milestones.map((m, i) => (
                        <div key={m.id} className="relative pl-8 border-l border-white/10 pb-6 last:pb-0">
                          <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-ink ${m.status === 'released' ? 'bg-emerald-400' : m.status === 'pending' ? 'bg-brand-gold' : 'bg-slate-700'}`} />
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold text-white">{m.stage}</h4>
                                <Badge variant={m.status === 'released' ? 'emerald' : m.status === 'pending' ? 'gold' : 'default'}>
                                  {m.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-500">Drawdown: {m.percentage}% (₦{m.amount.toLocaleString()})</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {m.requirements.map((req, ri) => (
                                <span key={ri} className="text-[10px] px-3 py-1 bg-white/5 rounded-full border border-white/5 text-slate-400">
                                  {req}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Loan Offers */}
                <div className="space-y-8">
                  <h3 className="text-lg font-display font-bold flex items-center gap-2 px-4">
                    <FileCheck2 className="w-5 h-5 text-brand-blue" /> Available Loan Offers
                  </h3>
                  {offers.map((offer) => (
                    <Card key={offer.id} className="border-white/5 hover:border-brand-blue/30 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-1">{offer.lenderName}</p>
                          <p className="text-2xl font-display font-bold text-white">₦{(offer.amount / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-emerald-400">{offer.interestRate}%</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">Annual Rate</p>
                        </div>
                      </div>
                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Tenure</span>
                          <span className="text-white font-bold">{offer.tenure}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed italic">
                          "{offer.repaymentTerms}"
                        </p>
                      </div>
                      <button className="btn-primary w-full py-3 text-xs group-hover:bg-brand-blue group-hover:text-white transition-all">
                        Accept Offer
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {/* Lender Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <MetricCard label="Incoming Requests" value="12" icon={Users} color="text-brand-blue" />
              <MetricCard label="Total Deployment" value="₦4.2B" icon={Banknote} color="text-emerald-400" />
              <MetricCard label="Avg. Risk Score" value="18.5%" icon={ShieldCheck} color="text-brand-gold" />
              <MetricCard label="Active Loans" value="45" icon={Building2} color="text-slate-400" />
            </div>

            <Card>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-display font-bold">Incoming Loan Requests</h3>
                <div className="flex gap-2">
                  <Badge variant="blue">New: 4</Badge>
                  <Badge variant="gold">High Priority: 2</Badge>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project</th>
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Readiness</th>
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risk Level</th>
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contractor</th>
                      <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: 'Lekki Heights', amount: '₦90M', readiness: '88%', risk: 'Low', contractor: 'BuildRight', color: 'text-emerald-400' },
                      { name: 'Abuja Plaza', amount: '₦250M', readiness: '72%', risk: 'Medium', contractor: 'Apex Builders', color: 'text-brand-orange' },
                      { name: 'Enugu Estate', amount: '₦120M', readiness: '91%', risk: 'Low', contractor: 'Zion Const.', color: 'text-emerald-400' },
                      { name: 'Port Harcourt Hub', amount: '₦450M', readiness: '54%', risk: 'High', contractor: 'Global Infra', color: 'text-red-400' }
                    ].map((req, i) => (
                      <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6">
                          <p className="text-sm font-bold text-white">{req.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase">Residential</p>
                        </td>
                        <td className="py-6 text-sm font-bold text-white">{req.amount}</td>
                        <td className="py-6">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-brand-gold">{req.readiness}</span>
                            <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-brand-gold" style={{ width: req.readiness }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-6">
                          <span className={`text-xs font-bold ${req.color}`}>{req.risk}</span>
                        </td>
                        <td className="py-6 text-sm text-slate-400">{req.contractor}</td>
                        <td className="py-6 text-right">
                          <button className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-brand-blue/50 hover:text-brand-blue transition-all">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-brand-blue/20">
                <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-blue" /> Portfolio Performance
                </h3>
                <div className="h-48 flex items-end justify-between gap-2">
                  {[40, 65, 45, 90, 75, 85, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-brand-blue/20 rounded-t-lg relative group">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-brand-blue rounded-t-lg transition-all duration-1000" 
                        style={{ height: `${h}%` }} 
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </Card>

              <Card className="border-brand-gold/20">
                <h3 className="text-lg font-display font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-gold" /> Risk Distribution
                </h3>
                <div className="flex items-center justify-center h-48">
                  <div className="relative w-32 h-32 rounded-full border-[12px] border-white/5 flex items-center justify-center">
                    <div className="absolute inset-[-12px] w-32 h-32 rounded-full border-[12px] border-emerald-400 border-t-transparent border-r-transparent rotate-45" />
                    <div className="text-center">
                      <p className="text-2xl font-display font-bold text-white">68%</p>
                      <p className="text-[8px] text-slate-500 uppercase font-bold">Low Risk</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto mb-1" />
                    <p className="text-[10px] text-slate-400">Low</p>
                  </div>
                  <div className="text-center">
                    <div className="w-2 h-2 rounded-full bg-brand-orange mx-auto mb-1" />
                    <p className="text-[10px] text-slate-400">Medium</p>
                  </div>
                  <div className="text-center">
                    <div className="w-2 h-2 rounded-full bg-red-400 mx-auto mb-1" />
                    <p className="text-[10px] text-slate-400">High</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FinancingEngine;
