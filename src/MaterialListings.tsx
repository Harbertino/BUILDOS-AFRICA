import React from 'react';
import { Sidebar, Card, Badge, SectionHeader } from './components/Layout';
import { MarketplaceMaterial } from './types';
import { Search, Filter, ShoppingCart, Star, Package, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const MaterialListings = () => {
  const materials: MarketplaceMaterial[] = [
    {
      id: 'MAT-001',
      name: 'Dangote Cement (50kg)',
      category: 'Cement',
      basePrice: 8500,
      unit: 'Bag',
      tiers: [
        { minQuantity: 100, price: 8200 },
        { minQuantity: 500, price: 7900 },
        { minQuantity: 1000, price: 7700 }
      ],
      supplier: 'Dangote Distributors Ltd',
      rating: 4.9,
      stock: 5000
    },
    {
      id: 'MAT-002',
      name: 'Reinforcement Steel (12mm)',
      category: 'Steel',
      basePrice: 980000,
      unit: 'Ton',
      tiers: [
        { minQuantity: 5, price: 950000 },
        { minQuantity: 20, price: 920000 }
      ],
      supplier: 'SteelCo West Africa',
      rating: 4.7,
      stock: 150
    },
    {
      id: 'MAT-003',
      name: 'Sharp Sand (20 Tons)',
      category: 'Aggregates',
      basePrice: 180000,
      unit: 'Trip',
      tiers: [
        { minQuantity: 5, price: 170000 },
        { minQuantity: 10, price: 165000 }
      ],
      supplier: 'Lagos Sand & Granite',
      rating: 4.5,
      stock: 1000
    }
  ];

  return (
    <div className="flex min-h-screen bg-ink text-white">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <SectionHeader 
          title="Material Marketplace" 
          subtitle="Direct procurement with bulk contractor pricing tiers."
        />

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search materials (cement, steel, sand...)" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-gold/50 transition-all"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2 px-6">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 gap-8">
          {materials.map((material) => (
            <Card key={material.id} className="group hover:border-brand-gold/30 transition-all">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Info Section */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="gold">{material.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-brand-gold font-bold">
                      <Star className="w-3 h-3 fill-brand-gold" /> {material.rating}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">{material.name}</h3>
                  <p className="text-sm text-slate-400 mb-6">Supplier: <span className="text-white font-medium">{material.supplier}</span></p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Base Price</p>
                      <p className="text-lg font-bold text-white">₦{material.basePrice.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {material.unit}</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Availability</p>
                      <p className="text-sm font-bold text-emerald-400">{material.stock.toLocaleString()} {material.unit}s in stock</p>
                    </div>
                  </div>
                </div>

                {/* Pricing Tiers Section */}
                <div className="lg:w-96 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Bulk Price Tiers</h4>
                  <div className="space-y-3 mb-6">
                    {material.tiers.map((tier, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-xs text-slate-400">{tier.minQuantity}+ {material.unit}s</span>
                        <span className="text-sm font-bold text-emerald-400">₦{tier.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-sm">
                    <ShoppingCart className="w-4 h-4" /> Add to Procurement
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

export default MaterialListings;
