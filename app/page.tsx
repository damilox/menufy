// src/app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame, UtensilsCrossed, Clock } from 'lucide-react';

export default function RestaurantLandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Determine the time of day for a warm greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Simulate initial loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              >
                <Flame className="w-8 h-8 text-[#050505]" />
              </motion.div>
              <h1 className="text-4xl font-black text-white tracking-tighter">
                Naija Bites<span className="text-amber-500">.</span>
              </h1>
              <div className="mt-8 flex gap-2">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 rounded-full bg-amber-500" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-amber-500" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-amber-500/30 overflow-hidden flex flex-col">
        
        {/* Navbar */}
        <nav className="w-full px-6 py-6 md:px-12 flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-500" />
            <span className="font-black text-xl tracking-tighter">Naija Bites.</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
            <Clock className="w-4 h-4" /> Open until 10:00 PM
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center max-w-[1600px] mx-auto w-full relative z-10">
          
          {/* Left Text Column */}
          <div className="flex-1 px-6 md:px-12 lg:pl-24 py-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-amber-500" />
                {greeting}, Welcome
              </h2>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                The True Taste<br />
                <span className="text-slate-400">Of Home.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 font-medium max-w-xl leading-relaxed mb-12">
                Experience authentic Nigerian cuisine prepared with heritage recipes, premium ingredients, and absolute perfection. 
                Ready for pickup or delivery.
              </p>

              {/* The Single CTA Button */}
              <Link href="/123/menu" className="inline-block group">
                <div className="flex items-center gap-6 bg-amber-500 hover:bg-amber-400 text-[#050505] pr-2 pl-8 py-2 rounded-full transition-all shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                  <span className="font-black text-lg">Order Now</span>
                  <div className="w-12 h-12 bg-[#050505] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ArrowRight className="w-5 h-5 text-amber-500" />
                  </div>
                </div>
              </Link>
              
              <div className="mt-8 flex items-center gap-4 text-sm font-bold text-slate-500">
                <UtensilsCrossed className="w-4 h-4 text-slate-600" />
                Freshly prepared upon order
              </div>
            </motion.div>
          </div>

          {/* Right Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? 50 : 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 w-full h-[50vh] lg:h-full relative overflow-hidden lg:rounded-l-[4rem]"
          >
            {/* Dark overlay to ensure it blends nicely with the background */}
            <div className="absolute inset-0 bg-[#050505]/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10 lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 lg:hidden block" />
            
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop" 
              alt="Premium Restaurant Dining"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </main>
    </>
  );
}