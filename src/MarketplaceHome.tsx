import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  Gavel, 
  Truck, 
  ShieldCheck, 
  Hammer, 
  ArrowRight, 
  Package, 
  Clock, 
  CheckCircle2,
  Wallet,
  Star
} from 'lucide-react';
import { Sidebar, Card, Badge, SectionHeader } from './components/Layout';
import { MarketplaceMaterial, MaterialRequest, EquipmentRental, MarketplaceOrder } from './types';

const MarketplaceHome = () => {
  // Sample Data
  const activeOrders: MarketplaceOrder[] = [
    {
      id: 'ORD-001',
      type: 'material',
      itemName: 'Dangote Cement (50kg)',
      amount: 450000,
      status: 'shipped',
      escrowStatus: 'held',
      deliveryDate: '2026-03-18',
      logistics: {
        truckType: '10-Ton Flatbed',
        trips: 1,
        estTime: '4 hours',
        estCost: 25000
      }
    },
    {
      id: 'ORD-002',
      type: 'equipment',
      itemName: 'Excavator (CAT 320)',
      amount: 120000,
      status: 'processing',
      escrowStatus: 'held',
      deliveryDate: '2026-03-17'
    }
  ];

  const recentBids = [
    { id: 'BID-101', supplier: 'Lafarge Direct', material: 'Elephant Cement', price: 8200, rating: 4.8 },
    { id: 'BID-102', supplier: 'SteelCo West', material: 'Reinforcement Bars', price: 950000, rating: 4.5 }
  ];

  const categories = [
    { name: 'Materials', icon: Package, count: 1240, path: '/marketplace/materials', color: 'text-brand-gold' },
    { name: 'Bidding', icon: Gavel, count: 42, path: '/marketplace/requests', color: 'text-brand-blue' },
    { name: 'Equipment', icon: Hammer, count: 85, path: '/marketplace/equipment', color: 'text-emerald-400' },
    { name: 'Escrow', icon: ShieldCheck, count: 12, path: '/marketplace/escrow', color: 'text-brand-orange' }
  ];

  return (
    <div className="flex min-h-screen bg-ink">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <SectionHeader 
          title="Construction Marketplace" 
          subtitle="Procure materials, rent equipment, and manage supplier bids with BuildOS Africa."
          action={
            <div className="flex gap-4">
              <Link to="/marketplace/escrow" className="btn-secondary flex items-center gap-2">
                <Wallet className="w-4 h-4" /> Escrow Wallet
              </Link>
              <Link to="/marketplace/requests/new" className="btn-primary flex items-center gap-2">
                <PlusCircle className="w-4 h-4" /> Post Material Request
              </Link>
            </div>
          }
        />

        {/* Quick Stats / Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((cat, i) => (
            <Link key={i} to={cat.path}>
              <Card className="hover:border-white/20 transition-all group cursor-pointer h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${cat.color}`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{cat.count} Active Listings</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Orders & Deliveries */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-display font-bold">Active Deliveries</h3>
                </div>
                <Link to="/marketplace/orders" className="text-xs font-bold text-brand-gold uppercase tracking-widest hover:underline">View All Orders</Link>
              </div>

              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div key={order.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                          {order.type === 'material' ? <Package className="w-6 h-6 text-slate-400" /> : <Hammer className="w-6 h-6 text-slate-400" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-white">{order.itemName}</h4>
                            <Badge variant={order.status === 'shipped' ? 'emerald' : 'blue'}>{order.status}</Badge>
                          </div>
                          <p className="text-xs text-slate-500">Order ID: {order.id} • Delivery: {order.deliveryDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <p className="text-lg font-bold text-white">₦{order.amount.toLocaleString()}</p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                          <ShieldCheck className="w-3 h-3" /> Escrow Secured
                        </div>
                      </div>
                    </div>

                    {order.logistics && (
                      <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Truck Type</p>
                          <p className="text-xs font-bold text-slate-300">{order.logistics.truckType}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Trips</p>
                          <p className="text-xs font-bold text-slate-300">{order.logistics.trips} Trip(s)</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Est. Time</p>
                          <p className="text-xs font-bold text-slate-300">{order.logistics.estTime}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Transport Cost</p>
                          <p className="text-xs font-bold text-emerald-400">₦{order.logistics.estCost.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Bulk Pricing Highlights */}
            <Card>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-display font-bold">Bulk Contractor Pricing</h3>
                </div>
                <Link to="/marketplace/materials" className="text-xs font-bold text-emerald-400 uppercase tracking-widest hover:underline">Browse All</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Dangote Cement', base: 8500, bulk: 7900, min: 100, unit: 'Bag' },
                  { name: 'Reinforcement Steel', base: 980000, bulk: 920000, min: 10, unit: 'Ton' }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-bold text-white mb-4">{item.name}</h4>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Standard Price</p>
                        <p className="text-sm text-slate-400 line-through">₦{item.base.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Bulk Price (Min {item.min} {item.unit}s)</p>
                        <p className="text-xl font-bold text-white">₦{item.bulk.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar: Recent Bids & Escrow Status */}
          <div className="space-y-8">
            <Card className="bg-brand-blue/5 border-brand-blue/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <Gavel className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-lg font-display font-bold">Open Supplier Bids</h3>
              </div>
              <div className="space-y-4">
                {recentBids.map((bid) => (
                  <div key={bid.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-white">{bid.supplier}</h4>
                      <div className="flex items-center gap-1 text-[10px] text-brand-gold">
                        <Star className="w-3 h-3 fill-brand-gold" /> {bid.rating}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{bid.material}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-white">₦{bid.price.toLocaleString()}</p>
                      <button className="text-[10px] font-bold text-brand-blue uppercase tracking-widest hover:underline">Review Bid</button>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/marketplace/requests" className="btn-secondary w-full mt-6 text-xs py-3">Manage All Requests</Link>
            </Card>

            <Card className="bg-brand-orange/5 border-brand-orange/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-lg font-display font-bold">Escrow Wallet</h3>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Funds in Escrow</span>
                  <span className="text-lg font-bold text-white">₦570,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Available Balance</span>
                  <span className="text-lg font-bold text-white">₦1,250,000</span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-brand-orange w-1/3" />
              </div>
              <Link to="/marketplace/escrow" className="btn-secondary w-full text-xs py-3 border-brand-orange/30 text-brand-orange hover:bg-brand-orange/10">Wallet Details</Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const PlusCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default MarketplaceHome;
