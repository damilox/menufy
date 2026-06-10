// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useLiveOrders } from '@/lib/LiveOrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, ChefHat, CheckCircle2, ChevronRight, Receipt, 
  BarChart3, Bell, Flame, ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard() {
  const { orders, updateOrderStatus } = useLiveOrders();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const newOrders = orders.filter(o => o.status === 'new');
  const inProgressOrders = orders.filter(o => o.status === 'in-progress');
  const readyOrders = orders.filter(o => o.status === 'ready');
  const todayRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(date));
  };

  return (
    <>
      {/* Subtle Background Grid Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Header */}
      <header className="h-20 bg-[#0a0c10]/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black text-white tracking-tight">Active Service</h1>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 font-bold text-xs tracking-widest uppercase">System Online</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-slate-400 font-medium bg-[#111318] px-4 py-2 rounded-xl border border-white/5">
            <Clock className="w-4 h-4 text-amber-500" />
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="w-6 h-6" />
            {newOrders.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0a0c10]" />
            )}
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 hide-scrollbar">
        
        {/* Analytics Overview Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Receipt className="w-20 h-20 text-white" /></div>
            <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest mb-2">Total Orders</p>
            <div className="flex items-end gap-3">
              <h3 className="text-4xl font-black text-white">{orders.length}</h3>
              <span className="flex items-center text-emerald-400 text-sm font-bold mb-1"><ArrowUpRight className="w-4 h-4" /> Today</span>
            </div>
          </div>
          
          <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Flame className="w-20 h-20 text-amber-500" /></div>
            <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest mb-2">Active in Kitchen</p>
            <div className="flex items-end gap-3">
              <h3 className="text-4xl font-black text-amber-500">{newOrders.length + inProgressOrders.length}</h3>
              <span className="text-slate-500 text-sm font-bold mb-1">Tickets</span>
            </div>
          </div>

          <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><BarChart3 className="w-20 h-20 text-emerald-500" /></div>
            <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest mb-2">Gross Revenue</p>
            <div className="flex items-end gap-3">
              <h3 className="text-4xl font-black text-white">₦{todayRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* KDS KANBAN BOARD */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full min-h-[600px] pb-10">
          
          {/* COLUMN 1: NEW ORDERS */}
          <div className="flex flex-col bg-[#0a0c10]/50 rounded-[32px] border border-white/5 overflow-hidden backdrop-blur-sm">
            <div className="p-5 border-b border-white/5 bg-[#111318] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center"><Receipt className="w-4 h-4 text-blue-400" /></div>
                <h2 className="text-lg font-black text-white tracking-tight">Incoming</h2>
              </div>
              <span className="bg-blue-500 text-[#050505] font-black px-2.5 py-0.5 rounded-full text-sm">{newOrders.length}</span>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-4 h-full hide-scrollbar">
              <AnimatePresence>
                {newOrders.map((order) => (
                  <motion.div key={order.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#111318] rounded-2xl p-5 border border-blue-500/20 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-colors"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-blue-400 font-black text-xl">#{order.id}</p>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5" /> {formatTime(order.timestamp)}
                        </div>
                      </div>
                      <span className="text-white font-bold bg-[#050505] px-3 py-1 rounded-lg text-sm border border-white/10">
                        ₦{order.totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start text-sm bg-white/5 px-3 py-2 rounded-lg">
                          <span className="text-white font-medium flex gap-3 items-center">
                            <span className="bg-[#050505] text-amber-500 font-black w-6 h-6 flex items-center justify-center rounded text-xs">{item.quantity}</span>
                            {item.menuItem.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button onClick={() => updateOrderStatus(order.id, 'in-progress')}
                      className="w-full bg-blue-500 hover:bg-blue-400 text-[#050505] font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <ChefHat className="w-5 h-5" /> Send to Kitchen
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* COLUMN 2: IN PROGRESS */}
          <div className="flex flex-col bg-[#0a0c10]/50 rounded-[32px] border border-white/5 overflow-hidden backdrop-blur-sm">
            <div className="p-5 border-b border-white/5 bg-[#111318] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center"><ChefHat className="w-4 h-4 text-amber-500" /></div>
                <h2 className="text-lg font-black text-white tracking-tight">Cooking</h2>
              </div>
              <span className="bg-amber-500 text-[#050505] font-black px-2.5 py-0.5 rounded-full text-sm">{inProgressOrders.length}</span>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-4 h-full hide-scrollbar">
              <AnimatePresence>
                {inProgressOrders.map((order) => (
                  <motion.div key={order.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#111318] rounded-2xl p-5 border border-amber-500/20 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-colors"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 animate-pulse" />
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-amber-500 font-black text-xl">#{order.id}</p>
                        <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-amber-500" /> Preparing</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6 opacity-70">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start text-sm bg-white/5 px-3 py-2 rounded-lg">
                          <span className="text-white font-medium flex gap-3 items-center">
                            <span className="text-amber-500 font-black">{item.quantity}x</span> {item.menuItem.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-[#050505] font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Order Ready
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* COLUMN 3: READY */}
          <div className="flex flex-col bg-[#0a0c10]/50 rounded-[32px] border border-white/5 overflow-hidden backdrop-blur-sm">
            <div className="p-5 border-b border-white/5 bg-[#111318] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
                <h2 className="text-lg font-black text-white tracking-tight">Dispatch</h2>
              </div>
              <span className="bg-emerald-500 text-[#050505] font-black px-2.5 py-0.5 rounded-full text-sm">{readyOrders.length}</span>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-4 h-full hide-scrollbar">
              <AnimatePresence>
                {readyOrders.map((order) => (
                  <motion.div key={order.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#111318] rounded-2xl p-5 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-emerald-500 font-black text-xl">#{order.id}</p>
                        <p className="text-emerald-500/60 text-xs font-bold mt-1 uppercase tracking-widest">Awaiting Pickup</p>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm mb-4 bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-white font-bold">{order.items.length} items</span> packed and ready for handover.
                    </p>

                    <button onClick={() => alert(`Order #${order.id} dispatched! (In a real app, this would archive the order)`)}
                      className="w-full bg-[#050505] border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      Complete Order <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}