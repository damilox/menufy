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
        className="group flex gap-5 p-4 bg-white/70 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white active:scale-[0.98] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] cursor-pointer"
      >
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div>
            <h3 className="font-bold text-slate-800 text-lg leading-tight tracking-tight">
              {item.name}
            </h3>
            <p className="text-slate-500 text-sm mt-1.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="font-extrabold text-slate-900 text-lg">
              ${item.price.toFixed(2)}
            </span>
            
            {/* Dietary Tags - More subtle */}
            <div className="flex gap-1">
              {item.dietaryTags.map((tag) => (
                <div key={tag} className="p-1.5 bg-slate-100/80 rounded-full text-slate-500">
                  {tag === 'vegetarian' && <Leaf className="w-3.5 h-3.5 text-emerald-500" />}
                  {tag === 'vegan' && <Leaf className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" />}
                  {tag === 'spicy' && <Flame className="w-3.5 h-3.5 text-orange-500" />}
                  {tag === 'gluten-free' && <WheatOff className="w-3.5 h-3.5 text-amber-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Item Image with hover zoom */}
        <div className="relative w-[120px] h-[120px] shrink-0 overflow-hidden rounded-[20px] shadow-sm">
          <Image 
            src={item.imageUrl} 
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
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