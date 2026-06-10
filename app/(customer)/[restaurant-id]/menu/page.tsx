// src/app/(customer)/[restaurant-id]/menu/page.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuItemCard from '@/components/customer/MenuItemCard';
import { mockRestaurant, mockCategories, mockMenuItems } from '@/lib/mock-data';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function CustomerMenuPage() {
  // Local state for handling allergies
  const [hasAllergies, setHasAllergies] = useState<boolean | null>(null);
  const [allergyNote, setAllergyNote] = useState('');
  const [isAllergySaved, setIsAllergySaved] = useState(false);

  const handleSaveAllergy = () => {
    setIsAllergySaved(true);
    // Note for later: You will want to pass this `allergyNote` into your CartContext 
    // so it travels to the checkout and the Admin Dashboard.
  };

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-amber-500/30 font-sans">
      
      {/* --- CLEAN, PLAIN-TEXT HERO SECTION --- */}
      <section className="relative w-full py-24 px-6 bg-[#050505] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase">Now Taking Orders</span>
            </div>
            
            {/* Extremely large, visible fonts */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.9] mb-6">
              {mockRestaurant.name}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
              Authentic flavors, zero compromise. Browse our current menu below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- ALLERGY DECLARATION SECTION --- */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 mb-8">
        <div className="bg-[#1A1D24] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Do you have any food allergies?</h3>
              <p className="text-slate-400 text-lg mb-6">Let our kitchen know so we can prepare your meal safely.</p>
              
              {!isAllergySaved ? (
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setHasAllergies(true)}
                      className={`flex-1 py-4 rounded-xl font-bold text-lg transition-colors border ${hasAllergies === true ? 'bg-amber-500 text-[#050505] border-amber-500' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                    >
                      Yes, I do
                    </button>
                    <button 
                      onClick={() => {
                        setHasAllergies(false);
                        setAllergyNote('');
                        setIsAllergySaved(true);
                      }}
                      className={`flex-1 py-4 rounded-xl font-bold text-lg transition-colors border ${hasAllergies === false ? 'bg-emerald-500 text-[#050505] border-emerald-500' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                    >
                      No, I don't
                    </button>
                  </div>

                  <AnimatePresence>
                    {hasAllergies === true && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <textarea 
                          value={allergyNote}
                          onChange={(e) => setAllergyNote(e.target.value)}
                          placeholder="E.g., Peanuts, Shellfish, Dairy..."
                          className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-amber-500 mb-4 h-32 resize-none"
                        />
                        <button 
                          onClick={handleSaveAllergy}
                          disabled={!allergyNote.trim()}
                          className="w-full bg-amber-500 text-[#050505] font-black text-lg py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                          Save Allergy Note
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-4 text-emerald-400"
                >
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="font-bold text-lg">Preferences Saved</p>
                    {hasAllergies && <p className="text-emerald-400/80 mt-1">Note: {allergyNote}</p>}
                  </div>
                  <button 
                    onClick={() => setIsAllergySaved(false)} 
                    className="ml-auto text-sm underline hover:text-emerald-300"
                  >
                    Edit
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Target Anchor for the Menu */}
      <div id="menu-start" className="h-4" />

      {/* --- STICKY NAVIGATION --- */}
      <div className="sticky top-0 z-30 bg-[#050505]/90 backdrop-blur-xl border-y border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar py-4 gap-3">
            {mockCategories.map((category, index) => (
              <button 
                key={category.id}
                onClick={() => document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={`whitespace-nowrap px-8 py-3 rounded-full font-bold text-base md:text-lg transition-all duration-300 active:scale-95 ${
                  index === 0 
                    ? 'bg-amber-500 text-[#0f1115] shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- RESPONSIVE MENU GRID --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-20">
        {mockCategories.map((category) => {
          const categoryItems = mockMenuItems.filter(item => item.categoryId === category.id);
          if (categoryItems.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="scroll-mt-32">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 tracking-tight flex items-center gap-6">
                {category.name}
                <div className="h-[1px] flex-1 bg-white/10 mt-1" />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryItems.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24, delay: index * 0.05 }}
                  >
                    <MenuItemCard item={item} />
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* --- PROPER FULL-WIDTH FOOTER --- */}
      <footer className="bg-[#1A1D24] border-t border-white/5 pt-16 pb-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
            
            {/* Brand Column */}
            <div>
              <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">Naija Bites</h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm mx-auto md:mx-0">
                The premier digital dining experience. Authentic Nigerian cuisine prepared with absolute perfection and care.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-6">Explore</h4>
              <ul className="space-y-4">
                <li><button className="text-slate-400 hover:text-amber-500 text-lg transition-colors">Our Menu</button></li>
                <li><button className="text-slate-400 hover:text-amber-500 text-lg transition-colors">Track Order</button></li>
                <li><button className="text-slate-400 hover:text-amber-500 text-lg transition-colors">Contact Kitchen</button></li>
              </ul>
            </div>

            {/* Admin / Tech Column */}
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-6">System</h4>
              <p className="text-slate-400 text-lg">Powered by <span className="text-white font-bold">Naija Bite</span></p>
              <p className="text-slate-500 text-base mt-2">Support: help@naijabite.com</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm gap-4 text-center">
            <p>© 2026 Naijabite. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}