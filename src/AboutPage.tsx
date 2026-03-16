import React from 'react';
import { Navbar, Card } from './components/Layout';
import { Building2, Globe, ShieldCheck, Zap, Users, Target } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h1 className="text-5xl mb-6">Building the Digital Infrastructure for <span className="gradient-text">African Construction</span></h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              BuildOS Africa is an AI Construction Intelligence Platform designed to bring transparency, efficiency, and data-driven planning to the African real estate market.
            </p>
          </header>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl mb-6">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Construction decisions are expensive. Guesswork should not be part of the process.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                BuildOS Africa combines construction intelligence, cost modeling, and AI planning tools to help you understand the real scope of your building project before construction begins.
              </p>
              <p className="text-slate-300 leading-relaxed">
                From early feasibility to detailed planning, the platform helps you estimate costs, understand materials, and structure your implementation timeline with confidence.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="text-brand-gold w-6 h-6" />
                </div>
                <h3 className="text-xl mb-3">Precision Planning</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our estimation engine uses real-time data from major African cities to provide highly accurate cost forecasts.
                </p>
              </Card>
              <Card>
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="text-brand-blue w-6 h-6" />
                </div>
                <h3 className="text-xl mb-3">African Innovation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Built specifically for the African context, accounting for local materials, labor rates, and environmental factors.
                </p>
              </Card>
            </div>

            <section className="bg-white/5 rounded-3xl p-8 lg:p-12 border border-white/10">
              <h2 className="text-3xl mb-8 text-center">Why BuildOS Africa?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Zap, title: 'Speed', desc: 'Go from idea to professional report in under 5 minutes.' },
                  { icon: ShieldCheck, title: 'Trust', desc: 'Data-driven estimates that reduce the risk of fraud and overpricing.' },
                  { icon: Users, title: 'Collaboration', desc: 'Share reports with architects, builders, and banks seamlessly.' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="text-brand-gold w-6 h-6" />
                    </div>
                    <h4 className="text-lg mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
