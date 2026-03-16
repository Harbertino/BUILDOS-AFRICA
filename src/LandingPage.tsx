import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Building2, Calculator, ClipboardCheck, FileBarChart, ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';
import { Navbar, Card } from './components/Layout';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-gold text-sm font-semibold mb-6">
              The Future of Construction Intelligence
            </span>
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-[1.1]">
              Build Smarter with AI.
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              BuildOS Africa helps you estimate construction costs, plan materials, and map project timelines before a single block is laid.
              <br className="hidden md:block" />
              AI-powered construction intelligence for builders, developers, and property investors across Africa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/new-project" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                Start a Project <ArrowRight className="w-5 h-5" />
              </Link>
              <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary w-full sm:w-auto">
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-10">Trusted by leading African developers & firms</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {['Lagos Homes', 'Abuja Realty', 'Nairobi Build', 'Accra Estates', 'Kigali Smart City'].map((name) => (
              <span key={name} className="text-xl font-display font-bold text-white tracking-tighter">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Positioning Section */}
      <section className="py-24 bg-ink relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-8 text-white">
            Construction decisions are expensive. <br />
            <span className="text-brand-gold">Guesswork should not be part of the process.</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-6">
            BuildOS Africa combines construction intelligence, cost modeling, and AI planning tools to help you understand the real scope of your building project before construction begins.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed">
            From early feasibility to detailed planning, the platform helps you estimate costs, understand materials, and structure construction phases with clarity.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4">Construction Intelligence Features</h2>
            <p className="text-slate-400">Everything you need to plan your project with precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI Construction Cost Estimation', icon: Calculator, desc: 'Instantly forecast the likely cost of your building project based on project size, finish level, and location. Understand the financial scope of your build before engaging contractors.' },
              { title: 'Material Quantity Planning', icon: Building2, desc: 'Get estimated quantities for essential materials including blocks, cement, reinforcement steel, roofing, and finishing components. Reduce planning errors and improve procurement decisions.' },
              { title: 'Construction Phase Breakdown', icon: Zap, desc: 'Visualize how your project progresses from site preparation to finishing and handover. See estimated timelines and understand the structure of your build.' },
              { title: 'Professional Project Reports', icon: FileBarChart, desc: 'Generate structured construction planning reports suitable for discussions with architects, engineers, partners, and investors. Download clear documentation for your project.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full glass-hover">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6">
                    <f.icon className="text-brand-gold w-6 h-6" />
                  </div>
                  <h3 className="text-xl mb-3">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl mb-8">How BuildOS Africa Works</h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Enter your building details', desc: 'Provide the basic information about your project including building type, location, number of floors, and finish level.' },
                  { step: '02', title: 'Generate your AI estimate', desc: 'BuildOS Africa analyzes the inputs and generates estimated construction costs, materials, and timelines.' },
                  { step: '03', title: 'Review planning insights', desc: 'Understand the breakdown of project costs, material quantities, and construction phases.' },
                  { step: '04', title: 'Download your report', desc: 'Export a professional construction planning report you can use to guide discussions with builders and consultants.' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-4xl font-display font-bold text-white/10">{s.step}</span>
                    <div>
                      <h3 className="text-xl mb-2">{s.title}</h3>
                      <p className="text-slate-400">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square glass rounded-3xl overflow-hidden border border-white/10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent" />
                <div className="p-8 h-full flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-white/10 rounded-full animate-pulse" />
                    <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse" />
                    <div className="h-32 w-full bg-white/5 rounded-2xl border border-white/10" />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-20 bg-white/5 rounded-xl" />
                      <div className="h-20 bg-white/5 rounded-xl" />
                      <div className="h-20 bg-white/5 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border border-brand-gold/30 shadow-2xl shadow-brand-gold/10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-brand-gold w-8 h-8" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Accuracy Rate</p>
                    <p className="text-2xl font-display font-bold text-white">94.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who BuildOS Africa Is For */}
      <section className="py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">Who BuildOS Africa Is For</h2>
            <p className="text-slate-400">Tailored intelligence for the entire construction ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: 'Property Owners', desc: 'Planning to build a house and want to understand the likely cost and scope before starting.' },
              { title: 'Real Estate Developers', desc: 'Evaluate project feasibility and construction cost structures during early planning stages.' },
              { title: 'Builders & Contractors', desc: 'Use AI-assisted estimates to support planning conversations with clients.' },
              { title: 'Architects & Designers', desc: 'Quickly generate preliminary project estimates for design discussions.' },
              { title: 'Diaspora Investors', desc: 'Understand construction budgets and planning details before committing to building projects in Africa.' },
            ].map((item, i) => (
              <Card key={i} className="p-6">
                <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why BuildOS Africa */}
      <section className="py-24 bg-black/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-10">Why BuildOS Africa</h2>
          <div className="space-y-8 text-lg text-slate-400 leading-relaxed">
            <p>
              Construction in Africa often begins with uncertainty. Costs fluctuate, planning varies, and reliable estimates are difficult to obtain without extensive consultations.
            </p>
            <p>
              BuildOS Africa introduces a new layer of planning intelligence by combining construction knowledge with AI-powered estimation systems.
            </p>
            <p className="text-white font-semibold">
              The result is faster early-stage planning and better decision-making.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-black/50" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Simple Pricing for Construction Planning Intelligence</h2>
            <p className="text-slate-400">Start with a quick estimate or generate a detailed professional construction planning report.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Basic Estimate', price: '₦5,000', features: ['Single Project Estimate', 'Cost Breakdown', 'Basic Materials List', '24h Access'] },
              { name: 'Professional', price: '₦25,000', features: ['Full Project Report', 'Detailed Quantities', 'Phase Timeline', 'AI Strategic Insights', 'PDF Download'], highlighted: true },
              { name: 'Developer', price: '₦100,000', priceSub: '/month', features: ['Unlimited Projects', 'Enterprise Dashboard', 'Custom Branding', 'Priority Support', 'API Access'] },
            ].map((p, i) => (
              <Card key={i} className={p.highlighted ? 'border-brand-gold/50 relative overflow-hidden' : ''}>
                {p.highlighted && <div className="absolute top-0 right-0 bg-brand-gold text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase">Most Popular</div>}
                <h3 className="text-xl mb-2">{p.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{p.price}</span>
                  {p.priceSub && <span className="text-slate-400 text-sm">{p.priceSub}</span>}
                </div>
                <ul className="space-y-4 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                      <ClipboardCheck className="text-brand-gold w-4 h-4 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={p.highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'}>Get Started</button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-black/50 to-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-8">Start planning your building project with clarity.</h2>
          <p className="text-xl text-slate-400 mb-12">
            Use BuildOS Africa to estimate costs, plan materials, and understand your construction timeline before construction begins.
          </p>
          <Link to="/new-project" className="btn-primary inline-flex">
            Start a Project
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-gold to-brand-orange rounded-lg flex items-center justify-center">
                  <Building2 className="text-black w-5 h-5" />
                </div>
                <span className="text-xl font-display font-bold tracking-tighter text-white">
                  BuildOS <span className="text-brand-gold">Africa</span>
                </span>
              </Link>
              <p className="text-slate-400 max-w-sm">
                Building the digital infrastructure layer for African construction through AI-powered planning and estimation.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link to="/new-project" className="hover:text-brand-gold transition-colors">Start Project</Link></li>
                <li><Link to="/pricing" className="hover:text-brand-gold transition-colors">Pricing</Link></li>
                <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-slate-500 text-sm">
            <p>© 2026 BuildOS Africa. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Globe className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Zap className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
