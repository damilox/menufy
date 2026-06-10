// src/components/customer/ItemDrawer.tsx
"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, Flame, WheatOff } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCart } from '@/lib/CartContext';

interface Props {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemDrawer({ item, isOpen, onClose }: Props) {
  const { addToCart } = useCart();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
          
          {/* Dark Glass Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0f1115]/80 backdrop-blur-sm pointer-events-auto"
          />

          {/* The Drawer Content 
            - Mobile: Snaps to the bottom, rounded top edges.
            - Desktop (sm): Floats in the center, max-width, fully rounded, glowing border.
          */}
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="relative w-full sm:max-w-lg bg-[#1A1D24] rounded-t-[32px] sm:rounded-[32px] max-h-[92vh] sm:max-h-[85vh] overflow-y-auto flex flex-col shadow-2xl border-t sm:border border-white/10 pointer-events-auto"
          >
            {/* Drag Handle Indicator (Mobile Only) */}
            <div className="w-full flex sm:hidden justify-center pt-4 pb-2 sticky top-0 z-10">
              <div className="w-14 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2.5 bg-[#0f1115]/60 hover:bg-white/10 backdrop-blur-md rounded-full z-20 active:scale-95 transition-all duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Cinematic Large Image */}
            <div className="relative w-full h-72 sm:h-80 shrink-0 sm:p-4">
              <div className="relative w-full h-full sm:rounded-[24px] overflow-hidden shadow-inner border-b sm:border border-white/5">
                <Image 
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Image Gradient overlay to blend with the dark drawer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D24] to-transparent sm:hidden" />
              </div>
            </div>

            {/* Text Content */}
            <div className="p-6 sm:pt-4 flex flex-col gap-5">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
                  {item.name}
                </h2>
                <span className="text-2xl font-black text-amber-500">
                  ₦{item.price.toLocaleString()}
                </span>
              </div>

              {/* Dietary Tags - Premium Dark Style */}
              {item.dietaryTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.dietaryTags.map((tag) => (
                    <div key={tag} className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-slate-300 capitalize shadow-sm">
                      {tag === 'vegetarian' && <Leaf className="w-4 h-4 text-emerald-400" />}
                      {tag === 'vegan' && <Leaf className="w-4 h-4 text-emerald-400" fill="currentColor" />}
                      {tag === 'spicy' && <Flame className="w-4 h-4 text-orange-500" />}
                      {tag === 'gluten-free' && <WheatOff className="w-4 h-4 text-amber-200" />}
                      {tag.replace('-', ' ')}
                    </div>
                  ))}
                </div>
              )}

              <p className="text-slate-400 leading-relaxed text-[16px] font-medium">
                {item.description}
              </p>

              {/* Spacer for bottom padding */}
              <div className="h-28 sm:h-24" />
            </div>

            {/* Sticky Action Footer with Amber Glow */}
            <div className="fixed sm:absolute bottom-0 left-0 right-0 p-5 bg-[#1A1D24]/80 backdrop-blur-xl border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-b-[32px]">
              <button 
                onClick={() => {
                  addToCart(item);
                  onClose();
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-[#0f1115] font-extrabold text-lg py-4 rounded-[20px] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2"
              >
                <span>Add to Order</span>
                <span className="w-1.5 h-1.5 bg-[#0f1115]/30 rounded-full mx-1" />
                <span>₦{item.price.toLocaleString()}</span>
              </button>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}