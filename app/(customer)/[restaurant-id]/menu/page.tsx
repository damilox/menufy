// src/app/(customer)/[restaurant-id]/menu/page.tsx
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import MenuItemCard from '@/components/customer/MenuItemCard';
import { mockRestaurant, mockCategories, mockMenuItems } from '@/lib/mock-data';

export default function CustomerMenuPage() {
  return (
    <main className="min-h-screen bg-stone-50 pb-32 font-sans selection:bg-slate-200">
      {/* Elevated Restaurant Header */}
      <div className="relative h-[35vh] w-full min-h-[250px]">
        <Image 
          src={mockRestaurant.coverImage}
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
        {/* Smooth gradient fade into the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-900/40 to-black/60" />
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-6 left-6 right-6 text-slate-900"
        >
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{mockRestaurant.name}</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">{mockRestaurant.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Ultra-sleek Sticky Navigation */}
      <div className="sticky top-0 z-30 bg-stone-50/80 backdrop-blur-xl border-b border-white/50 shadow-sm mt-4">
        <div className="flex overflow-x-auto hide-scrollbar px-6 py-4 gap-3">
          {mockCategories.map((category, index) => (
            <button 
              key={category.id}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 active:scale-95 ${
                index === 0 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Menu List */}
      <div className="px-4 pt-6 space-y-10">
        {mockCategories.map((category) => {
          const categoryItems = mockMenuItems.filter(item => item.categoryId === category.id);
          if (categoryItems.length === 0) return null;

          return (
            <section key={category.id} id={category.id}>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-5 px-2 tracking-tight">
                {category.name}
              </h2>
              <div className="flex flex-col gap-4">
                {categoryItems.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 24,
                      delay: index * 0.08 // Inline dynamic stagger
                    }}
                  >
                    <MenuItemCard item={item} />
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}