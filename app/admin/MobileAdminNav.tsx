// src/components/admin/MobileAdminNav.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChefHat, LayoutDashboard, UtensilsCrossed, 
  BarChart3, Settings, Flame 
} from 'lucide-react';

export default function MobileAdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Closes the menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  const navLinks = [
    { path: '/admin', label: 'Kitchen Display', icon: ChefHat },
    { path: '/admin/overview', label: 'Overview', icon: LayoutDashboard },
    { path: '/admin/menu', label: 'Menu Manager', icon: UtensilsCrossed },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between bg-[#0a0c10] border-b border-white/5 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5 text-[#050505]" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">Naija Bites<span className="text-amber-500">.</span></span>
        </div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 bg-[#111318] text-slate-300 rounded-xl border border-white/5 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Slide-out Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#050505]/80 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#0a0c10] border-l border-white/5 z-50 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Menu</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-[#111318] text-slate-400 rounded-xl hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto hide-scrollbar">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    href={link.path} 
                    onClick={handleLinkClick}
                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl font-bold transition-all ${
                      isActive(link.path) 
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="p-6 border-t border-white/5 bg-[#111318]/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-[#050505]">
                    AD
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Admin User</p>
                    <p className="text-xs text-slate-400">System Access</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}