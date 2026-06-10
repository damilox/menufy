// src/components/customer/FloatingCart.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function FloatingCart() {
  const { totalItems, totalPrice } = useCart();
  const params = useParams();
  const pathname = usePathname();
  const restaurantId = params['restaurant-id'];
  const isCartPage = pathname?.endsWith('/cart');

  // If the cart is empty or they are already on the checkout page, hide the button
  if (totalItems === 0 || isCartPage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 150, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 150, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="relative group pointer-events-auto">
          {/* Ambient Amber Glow behind the button */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/0 via-amber-500/20 to-amber-600/0 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
          
          <Link href={`/${restaurantId}/cart`} className="block relative w-full active:scale-[0.98] transition-transform duration-200">
            <div className="w-full bg-[#1A1D24]/90 backdrop-blur-xl border border-white/10 text-white rounded-[24px] p-2 pr-5 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden">
              
              {/* Left Side: Animated Badge & Label */}
              <div className="flex items-center gap-4">
                <motion.div 
                  key={totalItems} // This forces the pop animation every time the count changes
                  initial={{ scale: 0.5, backgroundColor: "#fff", color: "#000" }}
                  animate={{ scale: 1, backgroundColor: "#f59e0b", color: "#0f1115" }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="w-12 h-12 rounded-[18px] flex items-center justify-center shadow-inner font-black text-lg"
                >
                  {totalItems}
                </motion.div>
                <div className="flex flex-col">
                  <span className="font-bold tracking-wide text-sm uppercase text-slate-200">
                    View Order
                  </span>
                  <span className="text-xs text-slate-400 font-medium hidden sm:block">
                    Complete your request
                  </span>
                </div>
              </div>
              
              {/* Right Side: Total & Arrow */}
              <div className="flex items-center gap-3">
                <span className="font-black text-xl tracking-tight text-white">
                  ₦{totalPrice.toLocaleString()}
                </span>
                <div className="bg-white/5 p-2 rounded-full border border-white/5 group-hover:bg-amber-500/10 transition-colors duration-300">
                  <ChevronRight className="w-5 h-5 text-amber-500" />
                </div>
              </div>

            </div>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}