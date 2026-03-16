import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, ShieldAlert, Globe, Mail, Phone, BarChart3 } from 'lucide-react';
import { calculateEstimate, SAMPLE_PROJECTS } from './constants';
import { ProjectInput } from './types';
import { cn } from './lib/utils';

const ReportView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = React.useState<ProjectInput | null>(null);

  React.useEffect(() => {
    const sample = SAMPLE_PROJECTS.find(p => p.id === id);
    if (sample) {
      setProject(sample);
    } else {
      const stored = sessionStorage.getItem(`project_${id}`);
      if (stored) {
        setProject(JSON.parse(stored));
      }
    }
  }, [id]);

  if (!project) return <div className="p-20 text-center font-display text-slate-500">Loading professional report...</div>;

  const baseEstimate = calculateEstimate(project);
  const aiStored = sessionStorage.getItem(`ai_estimate_${project.id}`);
  const estimate = aiStored ? JSON.parse(aiStored) : baseEstimate;
  
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 p-8 md:p-16 print:p-0 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-slate-900 pb-10 mb-12 gap-8">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="text-white w-7 h-7" />
              </div>
              <span className="text-3xl font-display font-bold tracking-tighter">
                BuildOS <span className="text-slate-400">Africa</span>
              </span>
            </div>
            <h1 className="text-5xl font-display font-bold uppercase tracking-tight leading-none mb-4">Construction <br />Estimate Report</h1>
            <div className="flex items-center gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <span>Project ID: {project.id}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <span>Issued: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          <div className="text-right shrink-0 space-y-1">
            <p className="font-bold text-lg">BuildOS Africa Intelligence</p>
            <p className="text-sm text-slate-500">Innovation Hub, Victoria Island</p>
            <p className="text-sm text-slate-500">Lagos, Nigeria</p>
            <div className="pt-4 flex flex-col items-end gap-1">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-400"><Globe className="w-3 h-3" /> www.buildos.africa</span>
              <span className="flex items-center gap-2 text-xs font-bold text-slate-400"><Mail className="w-3 h-3" /> hello@buildos.africa</span>
              <span className="flex items-center gap-2 text-xs font-bold text-slate-400"><Phone className="w-3 h-3" /> +234 (0) 800 BUILDOS</span>
            </div>
          </div>
        </div>

        {estimate.visualization && (
          <div className="p-10 rounded-2xl bg-slate-900 text-white mb-16 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">BuildOS Architect Assistant Intelligence Output</p>
              </div>
              <p className="text-xl font-medium leading-relaxed max-w-3xl">
                This report integrates the complete BuildOS Africa Intelligence Pipeline: 
                <span className="text-slate-400"> Architectural Interpretation → 3D Preview Engine → Structural Review → Design Refinement → Cost Optimization.</span>
              </p>
            </div>
          </div>
        )}

        {/* Project Overview */}
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">01. Project Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
            {[
              { label: 'Project Name', value: project.name },
              { label: 'Building Type', value: project.buildingType },
              { label: 'Location', value: project.location },
              { label: 'Finish Level', value: project.finishLevel },
              { label: 'Built-up Area', value: `${project.builtUpArea} SQM` },
              { label: 'Floors', value: project.floors },
              { label: 'Bedrooms', value: project.bedrooms },
              { label: 'Bathrooms', value: project.bathrooms },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                <p className="font-bold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Summary */}
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">02. Financial Analysis</h2>
          <div className="bg-slate-900 text-white p-10 rounded-2xl mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Total Estimated Investment</p>
              <p className="text-6xl font-display font-bold">{formatCurrency(estimate.totalCost)}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Cost Per SQM</p>
              <p className="text-2xl font-bold">{formatCurrency(Math.round(estimate.totalCost / project.builtUpArea))}</p>
            </div>
          </div>
          
          <div className="overflow-hidden border border-slate-100 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-5 px-8 font-bold uppercase text-[10px] tracking-widest text-slate-500">Work Category</th>
                  <th className="py-5 px-8 font-bold uppercase text-[10px] tracking-widest text-slate-500 text-right">Allocation</th>
                  <th className="py-5 px-8 font-bold uppercase text-[10px] tracking-widest text-slate-500 text-right">Estimated Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {estimate.breakdown.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-8 font-bold text-slate-700">{item.name}</td>
                    <td className="py-5 px-8 text-right text-slate-400 font-medium">{Math.round((item.value / estimate.totalCost) * 100)}%</td>
                    <td className="py-5 px-8 text-right font-bold text-slate-900">{formatCurrency(item.value)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50/50 font-bold">
                  <td className="py-6 px-8 text-lg">Total Project Estimate</td>
                  <td className="py-6 px-8 text-right text-slate-400">100%</td>
                  <td className="py-6 px-8 text-right text-2xl text-slate-900">{formatCurrency(estimate.totalCost)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Materials Summary */}
        <section className="mb-16 page-break-before">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">03. Material Logistics & Quantities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            {estimate.materials.map((mat, i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-100 py-4 group">
                <span className="text-slate-500 font-medium group-hover:text-slate-900 transition-colors">{mat.name}</span>
                <div className="text-right">
                  <span className="font-bold text-slate-900">{mat.quantity.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-widest">{mat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">04. Strategic Execution Timeline</h2>
          <div className="relative pl-8 border-l-2 border-slate-100 space-y-12">
            {estimate.phases.map((phase, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-900" />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="max-w-xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{phase.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{phase.description}</p>
                  </div>
                  <div className="shrink-0 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Duration</span>
                    <span className="font-bold text-slate-900">{phase.duration} Weeks</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Insights */}
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">05. Intelligence Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {estimate.insights.map((insight, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
                <div className="w-2 h-2 rounded-full bg-slate-900 mt-2 shrink-0" />
                <p className="text-sm text-slate-700 font-medium leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3D Building Preview */}
        {estimate.visualization && (
          <section className="mb-16 page-break-before">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">06. 3D Architectural Visualization Concept</h2>
            <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100 mb-10">
              <p className="text-lg font-medium text-slate-800 italic leading-relaxed mb-10">
                "{estimate.visualization.description}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { label: 'Architectural Style', value: estimate.visualization.summary.style },
                  { label: 'Building Massing', value: estimate.visualization.summary.massing },
                  { label: 'Facade Character', value: estimate.visualization.summary.facade },
                  { label: 'Roof Form', value: estimate.visualization.summary.roof },
                  { label: 'Material Palette', value: estimate.visualization.summary.palette },
                  { label: 'Exterior Features', value: estimate.visualization.summary.features },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-200 p-8 rounded-2xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Rendering & Visualization Instructions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {Object.entries(estimate.visualization.renderingDirection).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                    <p className="text-[11px] text-slate-600 leading-tight">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Structural Review */}
        {estimate.structuralReview && (
          <section className="mb-16 page-break-before">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">07. Structural Inefficiency Detection Review</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Complexity Level', value: estimate.structuralReview.summary.complexityLevel },
                { label: 'Buildability Assessment', value: estimate.structuralReview.summary.buildabilityAssessment },
                { label: 'Execution Risk Level', value: estimate.structuralReview.summary.executionRiskLevel },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-base font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Detected Inefficiencies & Planning Weaknesses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {estimate.structuralReview.inefficiencies.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">{item.reason}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Implication:</span>
                      <span className="text-slate-800">{item.implication}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-[10px] text-slate-500 italic">
                Engineering Caution: This review is an AI-assisted planning tool. Final structural validation must be performed by a licensed structural engineer.
              </p>
            </div>
          </section>
        )}

        {/* Design Improvements */}
        {estimate.designImprovements && (
          <section className="mb-16 page-break-before">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">08. Architectural Design Improvement Recommendations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              {[
                { title: 'Spatial Planning', items: estimate.designImprovements.spatial },
                { title: 'Functional Improvements', items: estimate.designImprovements.functional },
                { title: 'Aesthetic / Facade', items: estimate.designImprovements.aesthetic },
                { title: 'Buildability', items: estimate.designImprovements.buildability },
              ].map((section, i) => (
                <div key={i}>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">{section.title}</h3>
                  <div className="space-y-3">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex gap-3">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-slate-900 shrink-0" />
                        <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 p-10 rounded-2xl text-white">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Priority Strategic Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {estimate.designImprovements.priorityActions.map((action, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cost Optimization */}
        {estimate.costOptimization && (
          <section className="mb-16 page-break-before">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">09. Pre-Construction Cost Optimization Review</h2>
            
            <div className="bg-emerald-50 p-10 rounded-2xl border border-emerald-100 mb-12">
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-6">Top Cost Pressure Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {estimate.costOptimization.pressurePoints.map((point, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-lg bg-emerald-600/10 flex items-center justify-center shrink-0 text-[10px] font-bold text-emerald-600">
                      {i + 1}
                    </div>
                    <p className="text-sm text-emerald-900 font-medium leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recommended Savings Opportunities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {estimate.costOptimization.savingsOpportunities.map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">{item.area}</p>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">{item.recommendation}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.reason}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Low-Impact Cuts</h4>
                  <ul className="space-y-3">
                    {estimate.costOptimization.lowImpactCuts.map((cut, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-600 shrink-0" />
                        {cut}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">High-Impact Decisions</h4>
                  <ul className="space-y-3">
                    {estimate.costOptimization.highImpactDecisions.map((decision, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-600 shrink-0" />
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Market Intelligence */}
        {estimate.marketIntelligence && (
          <section className="mb-16 page-break-before">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 pb-3 mb-8">10. Live Market Price Intelligence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {estimate.marketIntelligence.map((item, i) => (
                <div key={i} className="p-8 rounded-2xl border border-slate-100 bg-slate-50/30">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">{item.materialName}</h3>
                      <p className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        item.trend === 'Rising' ? 'text-rose-600' : 
                        item.trend === 'Falling' ? 'text-emerald-600' : 'text-slate-500'
                      )}>
                        Trend: {item.trend}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Market Price</p>
                      <p className="text-lg font-bold text-slate-900">₦{item.avgPrice.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-white border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Min Price</p>
                      <p className="text-sm font-bold text-slate-700">₦{item.minPrice.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Max Price</p>
                      <p className="text-sm font-bold text-slate-700">₦{item.maxPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-4">
                    {item.insight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Planning Note */}
        {estimate.designImprovements && (
          <section className="mb-16 page-break-before">
            <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Planning Note</h3>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
                This analysis is AI-assisted pre-construction planning intelligence generated by the BuildOS Africa Architect Assistant. 
                While these insights are grounded in architectural and engineering logic, final design validation, structural calculations, 
                and construction documentation must be performed and certified by licensed architects and engineers.
              </p>
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <section className="mt-24 pt-10 border-t-2 border-slate-100">
          <div className="flex gap-6 items-start bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <ShieldAlert className="w-8 h-8 text-slate-300 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Professional Disclaimer</p>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                This report provides an AI-generated construction estimate based on current market data and user-provided inputs. It is intended for preliminary planning and feasibility purposes only. BuildOS Africa recommends consulting with licensed architects, engineers, and quantity surveyors for final construction documentation and precise billing.
              </p>
            </div>
          </div>
          <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] mt-12">BuildOS Africa • Intelligence for the Built Environment</p>
        </section>

        {/* Print Button Overlay */}
        <div className="fixed bottom-10 right-10 print:hidden flex gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all shadow-lg"
          >
            Back to Dashboard
          </button>
          <button 
            onClick={() => window.print()} 
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 flex items-center gap-3"
          >
            Download Official Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
