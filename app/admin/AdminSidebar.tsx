"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChefHat, LayoutDashboard, UtensilsCrossed, 
  BarChart3, Settings, Flame, MoreVertical 
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-[#0a0c10] border-r border-white/5 hidden lg:flex flex-col z-50">
      {/* Brand */}
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5 text-[#050505]" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">Naija Bites<span className="text-amber-500">.</span></span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2">
        <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Operations</p>
        
        <Link href="/admin" 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
            isActive('/admin') 
              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
              : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
          }`}
        >
          <ChefHat className="w-5 h-5" /> Kitchen Display
        </Link>

        <Link href="/admin/overview" 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
            isActive('/admin/overview') 
              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
              : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" /> Overview
        </Link>

        <Link href="/admin/menu" 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
            isActive('/admin/menu') 
              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
              : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" /> Menu Manager
        </Link>
        
        <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 mt-8">Business</p>
        
        <Link href="/admin/analytics" 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
            isActive('/admin/analytics') 
              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
              : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
          }`}
        >
          <BarChart3 className="w-5 h-5" /> Analytics
        </Link>

        <Link href="/admin/settings" 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
            isActive('/admin/settings') 
              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
              : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
          }`}
        >
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 bg-[#111318] rounded-xl border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-[#050505]">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Admin User</p>
            <p className="text-xs text-slate-400 truncate">Head Chef</p>
          </div>
          <MoreVertical className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </aside>
  );
}