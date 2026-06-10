// src/app/admin/overview/page.tsx
"use client";

import { useLiveOrders } from '@/lib/LiveOrderContext';
import { motion } from 'framer-motion';
import { 
  TrendingUp, DollarSign, ShoppingBag, Activity, 
  ArrowUpRight, ArrowDownRight, Download, PauseCircle,
  Clock, Receipt
} from 'lucide-react';

export default function OverviewPage() {
  const { orders } = useLiveOrders();

  // Real-time calculations from your context
  const todayRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? (todayRevenue / totalOrders) : 0;

  // Simulated chart data for the presentation
  const weeklyData = [
    { day: 'Mon', revenue: 45000, height: '40%' },
    { day: 'Tue', revenue: 52000, height: '50%' },
    { day: 'Wed', revenue: 38000, height: '35%' },
    { day: 'Thu', revenue: 65000, height: '65%' },
    { day: 'Fri', revenue: 89000, height: '85%' },
    { day: 'Sat', revenue: 120000, height: '100%' },
    { day: 'Sun', revenue: 95000, height: '90%' },
  ];

  const topItems = [
    { name: 'Jollof Rice & Turkey', sold: 142, percentage: '85%' },
    { name: 'Asun (Spicy Goat Meat)', sold: 98, percentage: '65%' },
    { name: 'Grilled Tilapia & Chips', sold: 74, percentage: '45%' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 hide-scrollbar pb-20">
      
      {/* --- HEADER & QUICK ACTIONS --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">System Overview</h1>
          <p className="text-slate-400 mt-2 font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" /> Live performance metrics for today.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#111318] hover:bg-white/5 text-white border border-white/10 rounded-xl font-bold transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl font-bold transition-colors">
            <PauseCircle className="w-4 h-4" /> Pause Orders
          </button>
        </div>
      </header>

      {/* --- TOP METRICS ROW --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="flex items-center text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-md">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +14.5%
            </span>
          </div>
          <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest mb-1">Gross Revenue</p>
          <h3 className="text-3xl font-black text-white">₦{todayRevenue.toLocaleString()}</h3>
        </div>

        <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
            </div>
            <span className="flex items-center text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-md">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +5.2%
            </span>
          </div>
          <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest mb-1">Total Orders</p>
          <h3 className="text-3xl font-black text-white">{totalOrders}</h3>
        </div>

        <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <span className="flex items-center text-red-400 text-xs font-bold bg-red-500/10 px-2 py-1 rounded-md">
              <ArrowDownRight className="w-3 h-3 mr-1" /> -2.1%
            </span>
          </div>
          <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest mb-1">Avg Order Value</p>
          <h3 className="text-3xl font-black text-white">₦{avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400/50 rounded-3xl p-6 shadow-[0_0_30px_rgba(245,158,11,0.2)] relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-20"><Activity className="w-32 h-32 text-[#050505]" /></div>
          <div className="relative z-10">
            <p className="text-[#050505] font-black text-sm uppercase tracking-widest mb-1">System Status</p>
            <h3 className="text-3xl font-black text-[#050505] mb-2">Optimal</h3>
            <p className="text-[#050505]/80 font-medium text-sm mt-4">Kitchen load is balanced. All APIs operational.</p>
          </div>
        </div>
      </div>

      {/* --- CHARTS & LISTS ROW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart (Visual Simulation) */}
        <div className="lg:col-span-2 bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-8">7-Day Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {weeklyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 w-full group">
                <div className="w-full relative flex justify-center h-full items-end">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#111318] text-white text-xs font-bold py-1 px-2 rounded-md whitespace-nowrap z-10 pointer-events-none border border-white/10">
                    ₦{data.revenue.toLocaleString()}
                  </div>
                  {/* Animated Bar */}
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: data.height }}
                    transition={{ duration: 1, delay: idx * 0.1, type: 'spring' }}
                    className={`w-full max-w-[40px] rounded-t-lg ${idx === 5 ? 'bg-amber-500' : 'bg-[#1A1D24] group-hover:bg-white/20'} transition-colors cursor-pointer relative overflow-hidden`}
                  >
                    {idx === 5 && <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />}
                  </motion.div>
                </div>
                <span className={`text-sm font-bold ${idx === 5 ? 'text-amber-500' : 'text-slate-500'}`}>{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6">Top Menu Items</h3>
          <div className="space-y-6">
            {topItems.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-white">{item.name}</span>
                  <span className="text-slate-400 font-medium">{item.sold} sold</span>
                </div>
                <div className="h-2 w-full bg-[#111318] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: item.percentage }}
                    transition={{ duration: 1, delay: 0.5 + (idx * 0.2) }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-white/5 text-slate-400 font-bold hover:bg-white/5 hover:text-white transition-colors text-sm">
            View Full Menu Report
          </button>
        </div>

      </div>

      {/* --- LIVE ACTIVITY FEED --- */}
      <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6">Recent Live Activity</h3>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl">
              <Activity className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">No live orders yet. The feed will populate as orders arrive.</p>
            </div>
          ) : (
            orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-4 bg-[#111318] rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Receipt className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold">New Order <span className="text-amber-500">#{order.id}</span> received</p>
                  <p className="text-sm text-slate-400">{order.items.length} items • ₦{order.totalPrice.toLocaleString()}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <Clock className="w-3 h-3" /> 
                    {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(order.timestamp))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}