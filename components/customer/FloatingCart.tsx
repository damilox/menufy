// src/components/customer/FloatingCart.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export default function FloatingCart() {
  const { totalItems, totalPrice } = useCart();
  const params = useParams();
  const pathname = usePathname();
  
  // Get the dynamic restaurant ID from the URL
  const restaurantId = params['restaurant-id'];

  // Don't show the floating cart if they are already on the cart page!
  const isCartPage = pathname.endsWith('/cart');

  if (totalItems === 0 || isCartPage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto">
          <Link href={`/${restaurantId}/cart`} className="block w-full">
            <button className="w-full bg-black text-white rounded-full px-6 py-4 flex items-center justify-between shadow-xl active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 px-3 py-1 rounded-full font-medium text-sm">
                  {totalItems}
                </div>
                <span className="font-semibold">View Order</span>
              </div>
              
              <div className="flex items-center gap-2 font-bold text-lg">
                ${totalPrice.toFixed(2)}
                <ShoppingBag className="w-5 h-5 ml-1" />
              </div>
            </button>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}