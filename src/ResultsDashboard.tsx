import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Building2, 
  Download, 
  ArrowLeft, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Package, 
  Calendar, 
  Lightbulb,
  ChevronRight,
  Printer,
  Layers,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Sparkles,
  Clock,
  ArrowRight,
  FileText
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Sidebar, Card, Badge, SectionHeader } from './components/Layout';
import { calculateEstimate, SAMPLE_PROJECTS } from './constants';
import { ProjectInput, ProjectEstimate, BuildingVisualization, StructuralReview, DesignImprovements, CostOptimization, MaterialIntelligence } from './types';
import { generateAIEstimate } from './services/aiService';
import { generateVisualizationConcept } from './services/visualizationService';
import { generateStructuralReview } from './services/structuralService';
import { generateDesignImprovements } from './services/designService';
import { generateCostOptimization } from './services/optimizationService';
import { generateMarketIntelligence } from './services/marketService';
import { cn } from './lib/utils';
import { ShieldAlert, AlertTriangle, CheckCircle2, Zap, Palette, Hammer, PiggyBank, Target, Scissors, Scale, Bot, BarChart3, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const ResultsDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = React.useState<ProjectInput | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiEstimate, setAiEstimate] = React.useState<ProjectEstimate | null>(null);

  const handleGenerateAI = async () => {
    if (!project) return;
    setAiLoading(true);
    try {
      const [estimateResult, vizResult, structuralResult] = await Promise.all([
        generateAIEstimate(project),
        generateVisualizationConcept(project),
        generateStructuralReview(project)
      ]);

      const designResult = await generateDesignImprovements(project, structuralResult);
      const optimizationResult = await generateCostOptimization(project, estimateResult, structuralResult, designResult);
      const marketResult = await generateMarketIntelligence(estimateResult);
      
      const finalResult = { 
        ...estimateResult, 
        visualization: vizResult,
        structuralReview: structuralResult,
        designImprovements: designResult,
        costOptimization: optimizationResult,
        marketIntelligence: marketResult
      };
      setAiEstimate(finalResult);
      sessionStorage.setItem(`ai_estimate_${project.id}`, JSON.stringify(finalResult));
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setAiLoading(false);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const stored = sessionStorage.getItem(`project_${id}`);
      if (stored) {
        setProject(JSON.parse(stored));
      } else {
        const sample = SAMPLE_PROJECTS.find(p => p.id === id);
        if (sample) setProject(sample);
      }
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-ink">
        <Sidebar />
        <main className="flex-1 p-8 lg:p-16 flex flex-col items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-brand-gold/20 border-t-brand-gold rounded-full mb-8"
          />
          <h2 className="text-2xl font-display font-bold mb-2">Analyzing Project Data</h2>
          <p className="text-slate-500">Our AI is computing material quantities and cost allocations...</p>
        </main>
      </div>
    );
  }

  if (!project) return <div className="p-20 text-center">Project not found</div>;

  const baseEstimate = calculateEstimate(project);
  const estimate = aiEstimate || baseEstimate;
  const totalWeeks = estimate.phases.reduce((acc, p) => acc + p.duration, 0);

  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-16 overflow-y-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="gold">{aiEstimate ? 'AI-Refined Estimate' : 'Construction Estimate Summary'}</Badge>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">ID: {project.id.slice(0, 8)}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">{project.name}</h1>
            <p className="text-slate-400 flex items-center gap-2 text-lg">
              Below is the AI-assisted estimate based on the project information you provided.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => window.print()} className="btn-secondary">
              <Printer className="w-5 h-5" /> Print
            </button>
            <Link to={`/report/${project.id}`} className="btn-primary">
              <Download className="w-5 h-5" /> Download Professional Project Report
            </Link>
          </div>
        </div>

        {/* AI Architect Assistant Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-white">AI Architect Assistant</h2>
              <p className="text-brand-gold font-bold text-xs uppercase tracking-widest">AI-powered architectural intelligence for smarter building decisions.</p>
            </div>
          </div>
          <p className="text-slate-400 max-w-3xl">
            Review how your design performs before construction begins. BuildOS analyzes layout intelligence, potential structural inefficiencies, improvement opportunities, and cost optimization paths.
          </p>
        </div>

        {/* BuildOS Architect Assistant Header */}
        {aiEstimate && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-brand-gold/20 via-brand-blue/10 to-brand-gold/20 border border-brand-gold/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Bot className="w-64 h-64 text-brand-gold" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold flex items-center justify-center">
                  <Bot className="w-7 h-7 text-ink" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-white">BuildOS Architect Assistant</h2>
                  <p className="text-brand-gold font-bold text-xs uppercase tracking-widest">Intelligence Pipeline Output</p>
                </div>
              </div>
              <p className="text-slate-300 max-w-3xl text-lg leading-relaxed">
                The BuildOS AI pipeline has completed a comprehensive review of your project. We've analyzed the architectural massing, 
                detected structural inefficiencies, generated design improvements, and identified cost optimization opportunities 
                to ensure your project is functional, elegant, and buildable.
              </p>
            </div>
          </motion.div>
        )}

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="lg:col-span-2 bg-gradient-to-br from-brand-gold/10 to-transparent border-brand-gold/20 flex flex-col md:flex-row items-center gap-12 p-12">
            <div className="flex-1">
              <p className="text-xs font-bold text-brand-gold uppercase tracking-[0.3em] mb-4">Total Estimated Investment</p>
              <h2 className="text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                ₦{estimate.totalCost.toLocaleString()}
              </h2>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Maximize className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Area</p>
                    <p className="text-sm font-bold text-white">{project.builtUpArea} SQM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Floors</p>
                    <p className="text-sm font-bold text-white">{project.floors} Levels</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Timeline</p>
                    <p className="text-sm font-bold text-white">{Math.ceil(totalWeeks / 4)} Months</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-64 h-64 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={estimate.breakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {estimate.breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#D4AF37', '#FF6B35', '#0077B6', '#10B981', '#6366F1', '#F59E0B', '#EC4899', '#64748B'][index % 8]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="flex flex-col">
            <h3 className="text-xl font-display font-bold mb-2 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-brand-gold" /> Planning Insights
            </h3>
            <p className="text-xs text-slate-500 mb-8">BuildOS Africa analyzes your project inputs and provides insights to help guide early-stage planning decisions.</p>
            <div className="space-y-6 flex-1">
              {estimate.insights.map((insight, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-sm text-slate-400 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={handleGenerateAI}
              disabled={aiLoading}
              className={cn(
                "btn-primary w-full mt-8 text-sm py-4 flex items-center justify-center gap-3 shadow-xl shadow-brand-gold/10",
                aiLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {aiLoading ? (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-ink/20 border-t-ink rounded-full"
                  />
                  Analyzing Design...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Run AI Design Review
                </>
              )}
            </button>
            {aiEstimate && (
              <Link 
                to={`/report/${project.id}`}
                className="btn-secondary w-full mt-4 text-xs py-3 flex items-center justify-center gap-2 border-white/10 hover:border-white/20"
              >
                <FileText className="w-4 h-4" /> Generate Architect Assistant Report
              </Link>
            )}
          </Card>
        </div>

        {/* 3D Building Preview Section */}
        {estimate.visualization && (
          <Card className="mb-16 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-2xl font-display font-bold">3D Building Preview Concept</h3>
                </div>
                
                <p className="text-slate-400 leading-relaxed mb-8 text-lg italic">
                  "{estimate.visualization.description}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Architectural Style', value: estimate.visualization.summary.style },
                    { label: 'Building Massing', value: estimate.visualization.summary.massing },
                    { label: 'Facade Character', value: estimate.visualization.summary.facade },
                    { label: 'Roof Form', value: estimate.visualization.summary.roof },
                    { label: 'Material Palette', value: estimate.visualization.summary.palette },
                    { label: 'Exterior Features', value: estimate.visualization.summary.features },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/3 space-y-8">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-blue/20 to-transparent border border-brand-blue/20">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-6 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Rendering Direction
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(estimate.visualization.renderingDirection).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{key}</p>
                        <p className="text-xs text-slate-300">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 italic text-center">
                  This conceptual visualization is generated based on your project parameters to guide architectural design.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Structural Review Section */}
        {estimate.structuralReview && (
          <Card className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">Structural Inefficiency Detection</h3>
                <p className="text-xs text-slate-500">AI-assisted pre-construction review for buildability and execution risk.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {[
                { label: 'Complexity Level', value: estimate.structuralReview.summary.complexityLevel, icon: Layers },
                { label: 'Buildability', value: estimate.structuralReview.summary.buildabilityAssessment, icon: CheckCircle2 },
                { label: 'Execution Risk', value: estimate.structuralReview.summary.executionRiskLevel, icon: AlertTriangle },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon className="w-4 h-4 text-brand-gold" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                  </div>
                  <p className="text-lg font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Likely Inefficiencies & Planning Weaknesses</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {estimate.structuralReview.inefficiencies.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-orange/30 transition-colors group">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0 mt-1">
                        <AlertTriangle className="w-4 h-4 text-brand-orange" />
                      </div>
                      <div>
                        <h5 className="text-base font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">{item.title}</h5>
                        <p className="text-sm text-slate-400 mb-3 leading-relaxed">{item.reason}</p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-orange uppercase tracking-widest">
                          <span>Implication:</span>
                          <span className="text-slate-300">{item.implication}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-brand-orange/5 border border-brand-orange/10 text-center">
              <p className="text-xs text-brand-orange/80 italic">
                Engineering Caution: This review is an AI-assisted planning tool. Final structural validation must be performed by a licensed structural engineer.
              </p>
            </div>
          </Card>
        )}

        {/* Design Improvements Section */}
        {estimate.designImprovements && (
          <Card className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">Design Improvement Recommendations</h3>
                <p className="text-xs text-slate-500">Architectural refinements to improve functionality, elegance, and buildability.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-10">
                {[
                  { title: 'Spatial Planning', items: estimate.designImprovements.spatial, icon: Maximize },
                  { title: 'Functional Logic', items: estimate.designImprovements.functional, icon: Zap },
                  { title: 'Aesthetic Refinements', items: estimate.designImprovements.aesthetic, icon: Palette },
                  { title: 'Buildability', items: estimate.designImprovements.buildability, icon: Hammer },
                ].map((section, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 mb-4">
                      <section.icon className="w-4 h-4 text-brand-gold" />
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white">{section.title}</h4>
                    </div>
                    <div className="space-y-3">
                      {section.items.map((item, j) => (
                        <div key={j} className="flex gap-3">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-gold shrink-0" />
                          <p className="text-sm text-slate-400 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:sticky lg:top-8 h-fit">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-gold/10 to-transparent border border-brand-gold/20">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-gold mb-8 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Priority Actions
                  </h4>
                  <div className="space-y-6">
                    {estimate.designImprovements.priorityActions.map((action, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-gold text-ink text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-sm font-semibold text-white leading-relaxed">{action}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <p className="text-[10px] text-slate-500 italic text-center">
                      These recommendations are intended to refine the existing concept for better performance and value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Cost Optimization Section */}
        {estimate.costOptimization && (
          <Card className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">Construction Cost Optimization</h3>
                <p className="text-xs text-slate-500">AI-assisted cost-planning for pre-construction value engineering.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-500" /> Recommended Savings Opportunities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {estimate.costOptimization.savingsOpportunities.map((item, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors">
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">{item.area}</p>
                        <h5 className="text-sm font-bold text-white mb-2">{item.recommendation}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-emerald-500" /> Low-Impact Cuts
                    </h4>
                    <ul className="space-y-3">
                      {estimate.costOptimization.lowImpactCuts.map((cut, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-400">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                          {cut}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-emerald-500" /> High-Impact Decisions
                    </h4>
                    <ul className="space-y-3">
                      {estimate.costOptimization.highImpactDecisions.map((decision, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-400">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                          {decision}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-6">Top Cost Pressure Points</h4>
                  <div className="space-y-4">
                    {estimate.costOptimization.pressurePoints.map((point, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-[10px] font-bold text-emerald-500">
                          {i + 1}
                        </div>
                        <p className="text-sm text-slate-300 font-medium leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <p className="text-[10px] text-slate-500 italic">
                    Cost optimization focuses on value engineering—simplifying the build without compromising structural integrity or project intent.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Planning Note */}
        {estimate.designImprovements && (
          <div className="mb-16 p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Planning Note</h4>
            <p className="text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed italic">
              This analysis is AI-assisted pre-construction planning intelligence generated by the BuildOS Africa Architect Assistant. 
              While these insights are grounded in architectural and engineering logic, final design validation, structural calculations, 
              and construction documentation must be performed and certified by licensed architects and engineers.
            </p>
          </div>
        )}

        {/* Market Intelligence Section */}
        {estimate.marketIntelligence && (
          <Card className="mb-16 border-brand-blue/20 bg-brand-blue/5">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold">Live Market Price Intelligence</h3>
                  <p className="text-xs text-slate-500">Real-time market movement and supplier price analysis.</p>
                </div>
              </div>
              <Badge variant="blue" className="border-brand-blue/30 text-brand-blue">
                Updated Live
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {estimate.marketIntelligence.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{item.materialName}</h4>
                    {item.trend === 'Rising' && <ArrowUpRight className="w-4 h-4 text-rose-500" />}
                    {item.trend === 'Falling' && <ArrowDownRight className="w-4 h-4 text-emerald-500" />}
                    {item.trend === 'Stable' && <Minus className="w-4 h-4 text-slate-400" />}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-500">
                      <span>Avg Market Price</span>
                      <span className="text-white font-bold">₦{item.avgPrice.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-blue" 
                        style={{ width: `${(item.avgPrice / item.maxPrice) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-500">
                      <span>Min: ₦{item.minPrice.toLocaleString()}</span>
                      <span>Max: ₦{item.maxPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      "{item.insight}"
                    </p>
                    <div className={cn(
                      "mt-3 text-[10px] font-bold uppercase tracking-widest",
                      item.trend === 'Rising' ? 'text-rose-500' : 
                      item.trend === 'Falling' ? 'text-emerald-500' : 'text-slate-400'
                    )}>
                      Trend: {item.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <h3 className="text-2xl font-display font-bold mb-2">Estimated Cost Breakdown</h3>
            <p className="text-sm text-slate-500 mb-8">The following allocation illustrates how construction costs are distributed across major project stages.</p>
            <div className="space-y-6">
              {estimate.breakdown.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 font-semibold">{item.name}</span>
                    <span className="text-white font-bold">₦{item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / estimate.totalCost) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-brand-gold to-brand-orange"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-display font-bold mb-2">Estimated Materials</h3>
            <p className="text-sm text-slate-500 mb-8">The quantities below represent a planning estimate for key construction materials. Actual quantities may vary based on final architectural and engineering designs.</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/5">
                    <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Material</th>
                    <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Quantity</th>
                    <th className="pb-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {estimate.materials.map((mat, i) => (
                    <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 text-sm font-semibold text-slate-300">{mat.name}</td>
                      <td className="py-4 text-sm font-bold text-white">{mat.quantity.toLocaleString()}</td>
                      <td className="py-4 text-xs font-bold text-slate-500 uppercase">{mat.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Project Timeline */}
        <Card className="mb-16">
          <h3 className="text-2xl font-display font-bold mb-2">Construction Timeline</h3>
          <p className="text-sm text-slate-500 mb-12">This section outlines the typical construction phases for a project of this scale. Actual timelines may vary depending on contractor capacity and project conditions.</p>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5" />
            <div className="space-y-12">
              {estimate.phases.map((phase, i) => (
                <div key={i} className="relative pl-12 group">
                  <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-ink border-2 border-white/10 flex items-center justify-center z-10 group-hover:border-brand-gold transition-colors">
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-brand-gold">{i + 1}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{phase.name}</h4>
                      <p className="text-sm text-slate-500">{phase.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="blue">{phase.duration} Weeks</Badge>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">Est. Cost</p>
                        <p className="text-sm font-bold text-white">₦{(estimate.totalCost * (estimate.breakdown[i]?.value / estimate.totalCost || 0.1)).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex flex-col items-center justify-center py-16 text-center border-t border-white/5">
          <h3 className="text-2xl font-display font-bold mb-4">Ready to proceed?</h3>
          <p className="text-slate-500 max-w-md mb-10">Use this as a planning guide for early-stage construction discussions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary">Save Project</button>
            <Link to={`/report/${project.id}`} className="btn-secondary">Download Professional Project Report</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsDashboard;
