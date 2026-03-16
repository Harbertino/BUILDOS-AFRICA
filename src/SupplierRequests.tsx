import React from 'react';
import { Sidebar, Card, Badge, SectionHeader } from './components/Layout';
import { MaterialRequest, SupplierBid } from './types';
import { Gavel, Plus, Clock, MapPin, Calendar, Star, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

const SupplierRequests = () => {
  const requests: MaterialRequest[] = [
    {
      id: 'REQ-501',
      material: 'Granite (3/4 inch)',
      quantity: 15,
      location: 'Victoria Island, Lagos',
      deliveryDate: '2026-03-25',
      projectRef: 'Ocean View Towers',
      status: 'open',
      bids: [
        {
          id: 'BID-901',
          requestId: 'REQ-501',
          supplierName: 'Granite Express',
          price: 165000,
          deliveryTime: '2 days',
          availability: true,
          rating: 4.6,
          status: 'pending'
        },
        {
          id: 'BID-902',
          requestId: 'REQ-501',
          supplierName: 'Quarry Direct',
          price: 162000,
          deliveryTime: '3 days',
          availability: true,
          rating: 4.2,
          status: 'pending'
        }
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-ink text-white">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <SectionHeader 
          title="Supplier Bidding" 
          subtitle="Post material requests and receive competitive bids from verified suppliers."
          action={
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Material Request
            </button>
          }
        />

        <div className="space-y-12">
          {requests.map((req) => (
            <div key={req.id} className="space-y-6">
              {/* Request Header */}
              <Card className="bg-brand-blue/5 border-brand-blue/20">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-display font-bold">{req.material}</h3>
                      <Badge variant="blue">{req.status}</Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-6">Request ID: {req.id} • Project: {req.projectRef}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <Plus className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Quantity</p>
                          <p className="text-sm font-bold">{req.quantity} Trips</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Location</p>
                          <p className="text-sm font-bold">{req.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Delivery By</p>
                          <p className="text-sm font-bold">{req.deliveryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Bids</p>
                    <p className="text-3xl font-display font-bold text-brand-blue">{req.bids.length}</p>
                  </div>
                </div>
              </Card>

              {/* Bids List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {req.bids.map((bid) => (
                  <Card key={bid.id} className="relative overflow-hidden group hover:border-brand-blue/50 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-bold text-white">{bid.supplierName}</h4>
                          <div className="flex items-center gap-1 text-xs text-brand-gold">
                            <Star className="w-3 h-3 fill-brand-gold" /> {bid.rating}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">Bid ID: {bid.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">₦{bid.price.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Per Unit</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Delivery Time</p>
                        <p className="text-xs font-bold text-slate-300">{bid.deliveryTime}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Stock Status</p>
                        <p className="text-xs font-bold text-emerald-400">In Stock</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 btn-primary py-3 text-xs flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Accept Bid
                      </button>
                      <button className="btn-secondary py-3 px-4 text-xs border-white/10 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30 transition-all">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SupplierRequests;
