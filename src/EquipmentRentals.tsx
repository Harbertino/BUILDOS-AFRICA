import React from 'react';
import { Sidebar, Card, Badge, SectionHeader } from './components/Layout';
import { EquipmentRental } from './types';
import { Hammer, Search, Filter, MapPin, CheckCircle2, User, Calendar } from 'lucide-react';

const EquipmentRentals = () => {
  const equipment: EquipmentRental[] = [
    {
      id: 'EQ-001',
      type: 'Excavator (CAT 320)',
      pricePerDay: 120000,
      location: 'Lekki, Lagos',
      availability: true,
      operatorIncluded: true,
      supplier: 'HeavyLift Rentals Ltd'
    },
    {
      id: 'EQ-002',
      type: 'Concrete Mixer (500L)',
      pricePerDay: 25000,
      location: 'Ikeja, Lagos',
      availability: true,
      operatorIncluded: false,
      supplier: 'BuildTools West'
    },
    {
      id: 'EQ-003',
      type: 'Mobile Crane (25 Ton)',
      pricePerDay: 250000,
      location: 'Port Harcourt',
      availability: true,
      operatorIncluded: true,
      supplier: 'HeavyLift Rentals Ltd'
    }
  ];

  return (
    <div className="flex min-h-screen bg-ink text-white">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <SectionHeader 
          title="Equipment Rental" 
          subtitle="Rent heavy machinery and construction tools from verified owners."
        />

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search equipment (excavator, crane, mixer...)" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-gold/50 transition-all"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2 px-6">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item) => (
            <Card key={item.id} className="group hover:border-emerald-400/30 transition-all flex flex-col">
              <div className="aspect-video rounded-2xl bg-white/5 mb-6 flex items-center justify-center relative overflow-hidden">
                <Hammer className="w-12 h-12 text-slate-700 group-hover:scale-110 transition-transform" />
                <div className="absolute top-4 right-4">
                  <Badge variant={item.availability ? 'emerald' : 'default'}>
                    {item.availability ? 'Available' : 'Rented'}
                  </Badge>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-display font-bold mb-2">{item.type}</h3>
                <p className="text-xs text-slate-500 mb-6">Supplier: <span className="text-slate-300">{item.supplier}</span></p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <MapPin className="w-4 h-4 text-slate-600" /> {item.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <User className="w-4 h-4 text-slate-600" /> {item.operatorIncluded ? 'Operator Included' : 'No Operator'}
                  </div>
                </div>

                <div className="flex items-end justify-between pt-6 border-t border-white/5">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Daily Rate</p>
                    <p className="text-xl font-bold text-white">₦{item.pricePerDay.toLocaleString()}</p>
                  </div>
                  <button className="btn-primary py-2.5 px-6 text-xs flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Book Now
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EquipmentRentals;
