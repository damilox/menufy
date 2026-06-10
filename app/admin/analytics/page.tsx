// src/app/admin/analytics/page.tsx
"use client";

import { useLiveOrders } from '@/lib/LiveOrderContext';
import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, PieChart, Calendar, 
  Download, ArrowUpRight, CreditCard, Landmark, Banknote
} from 'lucide-react';

export default function AnalyticsPage() {
  const { orders } = useLiveOrders();

  // --- LIVE DATA CALCS ---
  const todayRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const totalOrders = orders.length;

  // --- SIMULATED HISTORICAL DATA FOR CHARTS ---
  const monthlyRevenue = [
    { month: 'Jan', value: 1200000, height: '40%' },
    { month: 'Feb', value: 1500000, height: '50%' },
    { month: 'Mar', value: 1100000, height: '35%' },
    { month: 'Apr', value: 1800000, height: '60%' },
    { month: 'May', value: 2100000, height: '75%' },
    { month: 'Jun', value: 2500000, height: '90%' },
    { month: 'Jul', value: 2800000 + todayRevenue, height: '100%' }, 
  ];

  const paymentMethods = [
    { method: 'Card (Paystack)', percentage: 65, color: 'bg-blue-500', icon: CreditCard },
    { method: 'Bank Transfer', percentage: 25, color: 'bg-emerald-500', icon: Landmark },
    { method: 'Cash (POS)', percentage: 10, color: 'bg-amber-500', icon: Banknote },
  ];

  const busyHours = [
    { time: '10AM', load: '20%' }, { time: '12PM', load: '85%' }, 
    { time: '2PM', load: '65%' }, { time: '4PM', load: '40%' }, 
    { time: '6PM', load: '95%' }, { time: '8PM', load: '75%' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 hide-scrollbar pb-20">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Business Intelligence</h1>
          <p className="text-slate-400 mt-2 font-medium">
            Analyze revenue, order volume, and customer behavior.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0c10] border border-white/10 rounded-xl text-slate-400 font-medium">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Last 30 Days</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#050505] rounded-xl font-black transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </header>

      {/* --- KPI CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest mb-4 flex items-center justify-between">
            Net Revenue <ArrowUpRight className="w-4 h-4 text-emerald-500" />
          </p>
          <h3 className="text-4xl font-black text-white mb-2">₦{(13000000 + todayRevenue).toLocaleString()}</h3>
          <p className="text-emerald-500 text-sm font-bold bg-emerald-500/10 w-fit px-2 py-1 rounded-lg">
            +24.5% from last period
          </p>
        </div>

        <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest mb-4 flex items-center justify-between">
            Total Volume <TrendingUp className="w-4 h-4 text-blue-500" />
          </p>
          <h3 className="text-4xl font-black text-white mb-2">{4205 + totalOrders}</h3>
          <p className="text-blue-400 text-sm font-bold bg-blue-500/10 w-fit px-2 py-1 rounded-lg">
            +12.3% from last period
          </p>
        </div>

        <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest mb-4 flex items-center justify-between">
            Customer Retention <PieChart className="w-4 h-4 text-amber-500" />
          </p>
          <h3 className="text-4xl font-black text-white mb-2">68.2%</h3>
          <p className="text-slate-400 text-sm font-medium">
            Return within 30 days
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- MAIN REVENUE CHART (7 MONTHS) --- */}
        <div className="lg:col-span-2 bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white">Revenue Growth (2026)</h3>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-[#111318] px-3 py-1.5 rounded-lg border border-white/5">
              Monthly
            </span>
          </div>
          
          {/* THE FIX: Hardcoded h-[250px] so the bars have a concrete value to measure percentages against */}
          <div className="w-full flex items-end justify-between gap-2 md:gap-4 mt-auto pt-10 h-[250px]">
            {monthlyRevenue.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 w-full h-full group">
                <div className="w-full relative flex justify-center h-full items-end">
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#050505] text-sm font-black py-1.5 px-3 rounded-lg whitespace-nowrap z-10 pointer-events-none shadow-xl">
                    ₦{data.value.toLocaleString()}
                  </div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: data.height }}
                    transition={{ duration: 1.5, delay: idx * 0.1, type: 'spring' }}
                    className={`w-full max-w-[60px] rounded-t-xl ${idx === 6 ? 'bg-amber-500' : 'bg-[#111318] group-hover:bg-white/10'} transition-all cursor-pointer relative overflow-hidden`}
                  >
                    {idx === 6 && <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />}
                  </motion.div>
                </div>
                <span className={`text-sm font-bold ${idx === 6 ? 'text-amber-500' : 'text-slate-500'}`}>{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- SIDE WIDGETS --- */}
        <div className="space-y-6">
          
          {/* Payment Methods Breakdown */}
          <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6">Payment Methods</h3>
            <div className="space-y-5">
              {paymentMethods.map((method, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-white flex items-center gap-2">
                      <method.icon className={`w-4 h-4 ${method.color.replace('bg-', 'text-')}`} /> 
                      {method.method}
                    </span>
                    <span className="text-slate-400 font-bold">{method.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#111318] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${method.percentage}%` }}
                      transition={{ duration: 1.2, delay: 0.5 + (idx * 0.2) }}
                      className={`h-full ${method.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours Heatmap */}
          <div className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6">Peak Order Hours</h3>
            <div className="flex items-end justify-between h-32 gap-1">
              {busyHours.map((hour, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 w-full h-full justify-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: hour.load }}
                    transition={{ duration: 1, delay: 1 + (idx * 0.1) }}
                    className="w-full bg-gradient-to-t from-red-500/20 to-red-500 rounded-sm opacity-80"
                  />
                  <span className="text-[10px] font-bold text-slate-500">{hour.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}