// src/app/admin/settings/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, CreditCard, Clock, Bell, Shield, 
  Save, CheckCircle2, AlertTriangle, Key
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'general', label: 'Restaurant Profile', icon: Store },
    { id: 'payments', label: 'Payment Gateway', icon: CreditCard },
    { id: 'hours', label: 'Operating Hours', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: Shield },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 hide-scrollbar pb-20">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">System Settings</h1>
          <p className="text-slate-400 mt-2 font-medium">
            Configure your restaurant details, APIs, and operating preferences.
          </p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#050505] rounded-xl font-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed w-fit"
        >
          {isSaving ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Key className="w-5 h-5" />
            </motion.div>
          ) : saved ? (
            <><CheckCircle2 className="w-5 h-5" /> Saved Successfully</>
          ) : (
            <><Save className="w-5 h-5" /> Save Changes</>
          )}
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- SETTINGS NAVIGATION --- */}
        <aside className="lg:w-64 shrink-0 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : 'bg-[#0a0c10] text-slate-400 border border-white/5 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5 shrink-0" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* --- SETTINGS CONTENT AREA --- */}
        <div className="flex-1">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0a0c10] border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl"
          >
            
            {/* GENERAL SETTINGS */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Restaurant Profile</h2>
                  <p className="text-slate-400 text-sm">This information is displayed publicly on your customer-facing menu.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Restaurant Name</label>
                    <input type="text" defaultValue="Naija Bites" className="w-full bg-[#111318] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Support Phone</label>
                    <input type="text" defaultValue="+234 800 NAIJA BITES" className="w-full bg-[#111318] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Store Address</label>
                    <input type="text" defaultValue="14 Victoria Island, Lagos, Nigeria" className="w-full bg-[#111318] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Short Description</label>
                    <textarea defaultValue="Authentic Nigerian flavors, prepared with love. Experience the tradition." className="w-full bg-[#111318] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors h-24 resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* PAYMENTS (PAYSTACK INTEGRATION) */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Paystack Integration</h2>
                    <p className="text-slate-400 text-sm">Configure your payment gateway API keys for live transactions.</p>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-widest border border-emerald-500/20">
                    Connected
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4 mb-6 mt-4">
                  <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-400 font-bold text-sm">Test Mode is Currently Active</p>
                    <p className="text-blue-400/80 text-xs mt-1">You are currently using test keys. Real cards will not be charged. Switch to live keys when you are ready to launch.</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                      Test Public Key
                      <span className="text-xs text-amber-500 normal-case tracking-normal">Used in customer frontend</span>
                    </label>
                    <input type="text" defaultValue="pk_test_125c41798593eb654f73b89cb3c45b7979ac9402" className="w-full bg-[#111318] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Test Secret Key</label>
                    <input type="password" defaultValue="sk_test_********************************" className="w-full bg-[#111318] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/50 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Webhook URL</label>
                    <input type="text" readOnly defaultValue="https://naijabites.com/api/webhooks/paystack" className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-slate-500 font-mono text-sm cursor-not-allowed" />
                  </div>
                </div>
              </div>
            )}

            {/* OPERATING HOURS */}
            {activeTab === 'hours' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Operating Hours</h2>
                  <p className="text-slate-400 text-sm">Automate when your menu is able to accept orders.</p>
                </div>
                
                <div className="space-y-4 pt-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
                    <div key={day} className="flex items-center justify-between p-4 bg-[#111318] border border-white/5 rounded-xl">
                      <div className="flex items-center gap-4 w-32">
                        {/* Custom Toggle Switch */}
                        <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${idx !== 6 ? 'bg-amber-500' : 'bg-white/10'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${idx !== 6 ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                        <span className={`font-bold ${idx !== 6 ? 'text-white' : 'text-slate-500'}`}>{day}</span>
                      </div>
                      
                      <div className={`flex items-center gap-3 ${idx === 6 && 'opacity-30 pointer-events-none'}`}>
                        <input type="time" defaultValue="09:00" className="bg-[#050505] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-500" />
                        <span className="text-slate-500 font-bold">to</span>
                        <input type="time" defaultValue="22:00" className="bg-[#050505] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* NOTIFICATIONS & SECURITY PLACEHOLDERS */}
            {(activeTab === 'notifications' || activeTab === 'security') && (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <Shield className="w-12 h-12 text-slate-600" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Coming in V2</h3>
                  <p className="text-slate-400 text-sm max-w-sm">This section is restricted to Super Admin accounts. Configuration will be unlocked in the next release.</p>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}