import React from 'react';
import { Sidebar, Card, Badge, SectionHeader } from './components/Layout';
import { MarketplaceOrder } from './types';
import { Package, Truck, Clock, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from './lib/utils';

const OrderManagement = () => {
  const orders: MarketplaceOrder[] = [
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
    },
    {
      id: 'ORD-003',
      type: 'material',
      itemName: 'Sharp Sand (20 Tons)',
      amount: 180000,
      status: 'delivered',
      escrowStatus: 'released',
      deliveryDate: '2026-03-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'emerald';
      case 'shipped': return 'blue';
      case 'processing': return 'gold';
      default: return 'default';
    }
  };

  return (
    <div className="flex min-h-screen bg-ink text-white">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <SectionHeader 
          title="Order Management" 
          subtitle="Track deliveries, manage logistics, and confirm escrow releases."
        />

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="hover:border-white/20 transition-all">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      <ShieldCheck className="w-3 h-3" /> Escrow {order.escrowStatus}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">{order.itemName}</h3>
                      <p className="text-sm text-slate-500">Order ID: {order.id} • Amount: ₦{order.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  {order.logistics && (
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Truck Type</p>
                        <p className="text-sm font-bold text-slate-300">{order.logistics.truckType}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Trips</p>
                        <p className="text-sm font-bold text-slate-300">{order.logistics.trips}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Est. Delivery</p>
                        <p className="text-sm font-bold text-slate-300">{order.logistics.estTime}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Transport Cost</p>
                        <p className="text-sm font-bold text-emerald-400">₦{order.logistics.estCost.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:w-72 flex flex-col gap-3 justify-center">
                  {order.status === 'shipped' && (
                    <button className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Confirm Delivery
                    </button>
                  )}
                  <button className="btn-secondary w-full py-4 text-sm flex items-center justify-center gap-2 border-white/10">
                    <Truck className="w-4 h-4" /> Track Shipment
                  </button>
                  <button className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2 mt-2">
                    <ExternalLink className="w-3 h-3" /> View Invoice
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

export default OrderManagement;
