import React from 'react';
import { Sidebar, Card, Badge, SectionHeader } from './components/Layout';
import { EscrowTransaction } from './types';
import { Wallet, ShieldCheck, ArrowUpRight, ArrowDownRight, History, Lock, Unlock, Info, CheckCircle2 } from 'lucide-react';
import { cn } from './lib/utils';

const EscrowWallet = () => {
  const transactions: EscrowTransaction[] = [
    {
      id: 'TXN-8801',
      orderId: 'ORD-001',
      amount: 450000,
      type: 'payment',
      date: '2026-03-15 14:20',
      status: 'completed'
    },
    {
      id: 'TXN-8802',
      orderId: 'ORD-003',
      amount: 180000,
      type: 'release',
      date: '2026-03-16 09:45',
      status: 'completed'
    }
  ];

  return (
    <div className="flex min-h-screen bg-ink text-white">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <SectionHeader 
          title="Escrow Wallet" 
          subtitle="Secure construction procurement with automated escrow protection."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Balance Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-brand-orange/20 to-brand-gold/10 border-brand-orange/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <ShieldCheck className="w-48 h-48 text-brand-orange" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-display font-bold">Total Portfolio Value</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Available Balance</p>
                  <p className="text-5xl font-display font-bold text-white mb-6">₦1,250,000</p>
                  <div className="flex gap-4">
                    <button className="btn-primary px-8 py-3 text-sm">Deposit Funds</button>
                    <button className="btn-secondary px-8 py-3 text-sm border-white/10">Withdraw</button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4 text-brand-orange">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Funds in Escrow</span>
                  </div>
                  <p className="text-3xl font-display font-bold text-white mb-2">₦570,000</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    These funds are secured and will be released to suppliers only upon your delivery confirmation.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Escrow Security Info */}
          <Card className="bg-white/5 border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-display font-bold">Escrow Protection</h3>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-white font-bold block mb-1">Payment Security</span>
                  Funds are held in a secure BuildOS account until you verify the materials on site.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-brand-blue" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-white font-bold block mb-1">Dispute Resolution</span>
                  In case of quality issues, funds can be held or refunded through our mediation system.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <History className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-display font-bold">Transaction History</h3>
            </div>
            <button className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Export CSV</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transaction ID</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Order Ref</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Amount</th>
                  <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-6 text-sm font-bold text-slate-300">{txn.id}</td>
                    <td className="py-6">
                      <div className="flex items-center gap-2">
                        {txn.type === 'payment' ? (
                          <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center">
                            <Lock className="w-3 h-3 text-brand-orange" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center">
                            <Unlock className="w-3 h-3 text-emerald-400" />
                          </div>
                        )}
                        <span className="text-sm text-white capitalize">{txn.type}</span>
                      </div>
                    </td>
                    <td className="py-6 text-sm text-slate-500">{txn.orderId}</td>
                    <td className="py-6 text-sm text-slate-500">{txn.date}</td>
                    <td className="py-6 text-right font-bold text-white">
                      {txn.type === 'payment' ? '-' : '+'} ₦{txn.amount.toLocaleString()}
                    </td>
                    <td className="py-6 text-right">
                      <Badge variant="emerald">{txn.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default EscrowWallet;
