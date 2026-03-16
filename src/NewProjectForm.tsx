import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Ruler, 
  BedDouble, 
  Bath, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft,
  Maximize,
  Home,
  Waves,
  ArrowUpCircle
} from 'lucide-react';
import { Sidebar, Card, SectionHeader } from './components/Layout';
import { ProjectInput } from './types';
import { cn } from './lib/utils';

const NewProjectForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<Partial<ProjectInput>>({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    buildingType: 'Residential Duplex',
    location: 'Lagos',
    builtUpArea: 250,
    landSize: 450,
    floors: 2,
    bedrooms: 4,
    bathrooms: 4,
    finishLevel: 'Premium',
    optionalFeatures: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = formData as ProjectInput;
    sessionStorage.setItem(`project_${finalData.id}`, JSON.stringify(finalData));
    navigate(`/results/${finalData.id}`);
  };

  const updateField = (field: keyof ProjectInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    const current = formData.optionalFeatures || [];
    if (current.includes(feature)) {
      updateField('optionalFeatures', current.filter(f => f !== feature));
    } else {
      updateField('optionalFeatures', [...current, feature]);
    }
  };

  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-16 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </button>

          <SectionHeader 
            title="Project Details"
            subtitle="Provide the information about your building project to generate an AI construction estimate. The more accurate the details, the more precise your estimate will be."
          />

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Step 1: Core Identity */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-gold" />
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-lg">01</div>
                <div>
                  <h3 className="text-xl font-display font-bold">Core Identity</h3>
                  <p className="text-sm text-slate-500">Define the primary characteristics of your build.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Project Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Lekki Heights Phase II"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                    value={formData.name || ''}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Location</label>
                  <p className="text-[10px] text-slate-600 italic">Construction costs vary by city due to labor and logistics factors.</p>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                  >
                    {['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kano', 'Owerri', 'Uyo', 'Other'].map(loc => (
                      <option key={loc} value={loc} className="bg-charcoal">{loc}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Building Type</label>
                  <p className="text-[10px] text-slate-600 italic">Select the type of structure you plan to build.</p>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
                    value={formData.buildingType}
                    onChange={(e) => updateField('buildingType', e.target.value)}
                  >
                    {['Residential Duplex', 'Bungalow', 'Apartment Block', 'Commercial Space', 'Warehouse', 'Hotel/Hospitality'].map(type => (
                      <option key={type} value={type} className="bg-charcoal">{type}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Finish Level</label>
                  <p className="text-[10px] text-slate-600 italic">Choose the quality level of construction finishes.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Standard', 'Premium', 'Luxury'].map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => updateField('finishLevel', level)}
                        className={cn(
                          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                          formData.finishLevel === level 
                            ? "bg-brand-gold/20 border-brand-gold text-brand-gold shadow-lg shadow-brand-gold/10" 
                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 2: Technical Specifications */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-blue" />
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-lg">02</div>
                <div>
                  <h3 className="text-xl font-display font-bold">Technical Specifications</h3>
                  <p className="text-sm text-slate-500">Specify the dimensional and structural requirements.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Built-up Area (SQM)</label>
                  <p className="text-[10px] text-slate-600 italic">Enter the estimated total floor area of the building in square meters.</p>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                    value={formData.builtUpArea}
                    onChange={(e) => updateField('builtUpArea', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Land Size (SQM)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                    value={formData.landSize}
                    onChange={(e) => updateField('landSize', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Floors</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                    value={formData.floors}
                    onChange={(e) => updateField('floors', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Bedrooms</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                    value={formData.bedrooms}
                    onChange={(e) => updateField('bedrooms', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Bathrooms</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                    value={formData.bathrooms}
                    onChange={(e) => updateField('bathrooms', Number(e.target.value))}
                  />
                </div>
              </div>
            </Card>

            {/* Step 3: Premium Features */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400" />
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center text-emerald-400 font-bold text-lg">03</div>
                <div>
                  <h3 className="text-xl font-display font-bold">Optional Features</h3>
                  <p className="text-sm text-slate-500">Select additional project features if they are part of your design.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: 'Boys Quarter', icon: Home },
                  { id: 'Penthouse', icon: Layers },
                  { id: 'Swimming Pool', icon: Waves },
                  { id: 'Elevator', icon: ArrowUpCircle },
                ].map((feature) => (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => toggleFeature(feature.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-8 rounded-3xl border transition-all gap-5 group",
                      formData.optionalFeatures?.includes(feature.id)
                        ? "bg-emerald-400/10 border-emerald-400 text-emerald-400 shadow-lg shadow-emerald-400/5"
                        : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:bg-white/[0.08]"
                    )}
                  >
                    <feature.icon className={cn("w-10 h-10 transition-transform group-hover:scale-110", formData.optionalFeatures?.includes(feature.id) ? "text-emerald-400" : "text-slate-600")} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{feature.id}</span>
                  </button>
                ))}
              </div>
            </Card>

            <div className="flex items-center justify-end gap-6 pt-8">
              <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary min-w-[280px]">
                Generate AI Construction Estimate <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewProjectForm;
