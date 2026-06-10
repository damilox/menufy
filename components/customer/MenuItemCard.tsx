// src/components/customer/MenuItemCard.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Leaf, Flame, WheatOff } from 'lucide-react';
import { MenuItem } from '@/types';
import ItemDrawer from './ItemDrawer';

interface Props {
  item: MenuItem;
}

export default function MenuItemCard({ item }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsDrawerOpen(true)}
        className="group relative flex gap-4 p-3 bg-[#1A1D24]/40 backdrop-blur-md rounded-[28px] border border-white/5 
        hover:border-amber-500/30 hover:bg-[#1A1D24]/80 
        active:scale-[0.98] transition-all duration-500 
        hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] cursor-pointer h-full overflow-hidden"
      >
        {/* Subtle inner highlight border to add depth */}
        <div className="absolute inset-0 rounded-[28px] border border-white/[0.03] pointer-events-none" />

        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-between py-1 pl-2">
          <div>
            <h3 className="font-bold text-white text-[17px] leading-tight tracking-tight group-hover:text-amber-400 transition-colors duration-300">
              {item.name}
            </h3>
            <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="font-black text-amber-500 text-lg tracking-tight">
              ₦{item.price.toLocaleString()}
            </span>
            
            {/* Dietary Tags - Minimalist Style */}
            <div className="flex gap-1">
              {item.dietaryTags.map((tag) => (
                <div key={tag} className="p-1.5 bg-[#0f1115] rounded-full border border-white/5">
                  {tag === 'vegetarian' && <Leaf className="w-3 h-3 text-emerald-500" />}
                  {tag === 'vegan' && <Leaf className="w-3 h-3 text-emerald-500" fill="currentColor" />}
                  {tag === 'spicy' && <Flame className="w-3 h-3 text-orange-500" />}
                  {tag === 'gluten-free' && <WheatOff className="w-3 h-3 text-amber-300" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cinematic Item Image */}
        <div className="relative w-[110px] h-[110px] shrink-0 overflow-hidden rounded-[20px] shadow-lg border border-white/10">
          <Image 
            src={item.imageUrl} 
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle vignette on the image to make it look cinematic */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>

      <ItemDrawer 
        item={item} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  );
}