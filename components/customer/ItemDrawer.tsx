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
        <>
          {/* Dark Overlay - Inline Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm"
          />

          {/* Bottom Sheet Drawer - Inline Animation */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[32px] max-h-[92vh] overflow-y-auto flex flex-col shadow-2xl"
          >
            {/* Drag Handle Indicator */}
            <div className="w-full flex justify-center pt-4 pb-2 sticky top-0 bg-white rounded-t-[32px] z-10">
              <div className="w-14 h-1.5 bg-slate-200 rounded-full" />
            </div>

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 bg-slate-100/80 hover:bg-slate-200 rounded-full z-20 active:scale-95 transition-all duration-200"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            {/* Large Image with softer radius */}
            <div className="relative w-full h-72 shrink-0 px-4">
              <div className="relative w-full h-full rounded-[24px] overflow-hidden shadow-sm">
                <Image 
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-5">
              <div className="flex justify-between items-start gap-4">
                <h2 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  {item.name}
                </h2>
                <span className="text-2xl font-black text-slate-900">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Dietary Tags */}
              {item.dietaryTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.dietaryTags.map((tag) => (
                    <div key={tag} className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-sm font-bold text-slate-600 capitalize shadow-sm">
                      {tag === 'vegetarian' && <Leaf className="w-4 h-4 text-emerald-500" />}
                      {tag === 'vegan' && <Leaf className="w-4 h-4 text-emerald-500" fill="currentColor" />}
                      {tag === 'spicy' && <Flame className="w-4 h-4 text-orange-500" />}
                      {tag === 'gluten-free' && <WheatOff className="w-4 h-4 text-amber-500" />}
                      {tag.replace('-', ' ')}
                    </div>
                  ))}
                </div>
              )}

              <p className="text-slate-500 leading-relaxed text-[16px] font-medium">
                {item.description}
              </p>

              {/* Spacer for bottom padding */}
              <div className="h-28" />
            </div>

            {/* Sticky Action Footer with Glassmorphism */}
            <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
              <button 
                onClick={() => {
                  addToCart(item);
                  onClose();
                }}
                className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-[20px] active:scale-[0.98] transition-transform duration-200 shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2"
              >
                <span>Add to Order</span>
                <span className="w-1.5 h-1.5 bg-white/30 rounded-full mx-1" />
                <span>${item.price.toFixed(2)}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}