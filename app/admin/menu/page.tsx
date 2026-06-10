// src/app/admin/menu/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Plus, Filter, Edit2, Trash2, 
  MoreVertical, CheckCircle2, XCircle
} from 'lucide-react';
import { mockMenuItems, mockCategories } from '@/lib/mock-data';

export default function MenuManagerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Load initial mock data into state so we can toggle stock status locally for the demo
  const [menuItems, setMenuItems] = useState(mockMenuItems.map(item => ({
    ...item,
    inStock: true // Adding a mock stock status for the dashboard
  })));

  // Filter logic
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleStock = (id: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, inStock: !item.inStock } : item
    ));
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 hide-scrollbar pb-20">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Menu Manager</h1>
          <p className="text-slate-400 mt-2 font-medium">
            Control your digital storefront. Manage items, pricing, and availability.
          </p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#050505] rounded-xl font-black transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Plus className="w-5 h-5" /> Add New Item
        </button>
      </header>

      {/* --- CONTROLS ROW (Search & Filter) --- */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0c10] border border-white/5 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap px-5 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 ${
              activeCategory === 'all' 
                ? 'bg-white/10 text-white border border-white/20' 
                : 'bg-[#0a0c10] text-slate-400 border border-white/5 hover:bg-white/5'
            }`}
          >
            <Filter className="w-4 h-4" /> All Items
          </button>
          {mockCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-3 rounded-xl font-bold text-sm transition-colors ${
                activeCategory === cat.id 
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                  : 'bg-[#0a0c10] text-slate-400 border border-white/5 hover:bg-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* --- MENU DATA TABLE --- */}
      <div className="bg-[#0a0c10] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#111318]">
                <th className="p-5 text-xs uppercase tracking-widest font-bold text-slate-500">Item</th>
                <th className="p-5 text-xs uppercase tracking-widest font-bold text-slate-500">Category</th>
                <th className="p-5 text-xs uppercase tracking-widest font-bold text-slate-500">Price</th>
                <th className="p-5 text-xs uppercase tracking-widest font-bold text-slate-500">Status</th>
                <th className="p-5 text-xs uppercase tracking-widest font-bold text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.map((item, idx) => {
                const category = mockCategories.find(c => c.id === item.categoryId);
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id} 
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Item Name & Description */}
                    <td className="p-5">
                      <div>
                        <p className="font-bold text-white text-base">{item.name}</p>
                        <p className="text-slate-500 text-xs truncate max-w-[250px]">{item.description}</p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-5">
                      <span className="bg-white/5 border border-white/10 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg">
                        {category?.name || 'Uncategorized'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-5">
                      <span className="font-black text-white">₦{item.price.toLocaleString()}</span>
                    </td>

                    {/* Status Toggle */}
                    <td className="p-5">
                      <button 
                        onClick={() => toggleStock(item.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                          item.inStock 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                        }`}
                      >
                        {item.inStock ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {item.inStock ? 'In Stock' : 'Sold Out'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-[#111318] hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors border border-white/5">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-[#111318] hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors border border-white/5">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-[#111318] hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors border border-white/5">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-500">
                    No items found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}