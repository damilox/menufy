// src/app/(customer)/[restaurant-id]/cart/page.tsx
"use client";

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { ArrowLeft, Receipt, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, totalPrice } = useCart();
  const params = useParams();
  const router = useRouter();
  const restaurantId = params['restaurant-id'];

  const tax = totalPrice * 0.08; // 8% dummy tax
  const finalTotal = totalPrice + tax;

  const handlePlaceOrder = () => {
    alert("Order Placed Successfully! This will be sent to the Admin Dashboard.");
    router.push(`/${restaurantId}/menu`);
  };

  // Premium Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center font-sans">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-white rounded-[32px] shadow-sm flex items-center justify-center mb-6 border border-slate-100"
        >
          <Receipt className="w-10 h-10 text-slate-300" />
        </motion.div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Your tray is empty</h2>
        <p className="text-slate-500 font-medium mb-10">Looks like you haven't added any dishes yet.</p>
        <Link href={`/${restaurantId}/menu`} className="active:scale-95 transition-transform">
          <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-slate-900/20">
            Back to Menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 pb-40 font-sans selection:bg-slate-200">
      {/* Glassmorphic Header */}
      <header className="bg-stone-50/80 backdrop-blur-xl px-4 py-5 sticky top-0 z-10 border-b border-slate-200/50 flex items-center gap-4">
        <Link href={`/${restaurantId}/menu`} className="p-2 -ml-2 hover:bg-slate-200/50 active:scale-95 rounded-full transition-all">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </Link>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Review Order</h1>
      </header>

      {/* Order Items List */}
      <div className="p-4 space-y-4 mt-2">
        {items.map((item, index) => (
          <motion.div 
            key={item.menuItem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24, delay: index * 0.1 }}
            className="flex items-center justify-between p-5 bg-white/70 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 text-slate-900 font-extrabold rounded-[12px] flex items-center justify-center shrink-0">
                {item.quantity}x
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-[16px] leading-tight">{item.menuItem.name}</h3>
                <p className="text-sm text-slate-500 font-medium mt-0.5">${item.menuItem.price.toFixed(2)} each</p>
              </div>
            </div>
            <span className="font-extrabold text-slate-900 text-lg">
              ${(item.menuItem.price * item.quantity).toFixed(2)}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Order Summary Receipt */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: items.length * 0.1 }}
        className="mx-4 mt-8 p-6 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-4 relative overflow-hidden"
      >
        {/* Decorative receipt zig-zag top could go here in a real app */}
        <h3 className="font-extrabold text-slate-900 text-lg mb-2">Summary</h3>
        
        <div className="flex justify-between text-slate-500 font-medium">
          <span>Subtotal</span>
          <span className="text-slate-900 font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-500 font-medium">
          <span>Estimated Tax</span>
          <span className="text-slate-900 font-bold">${tax.toFixed(2)}</span>
        </div>
        
        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-end">
          <span className="font-bold text-slate-500 text-sm mb-1">Total due</span>
          <span className="font-black text-slate-900 text-3xl tracking-tight">${finalTotal.toFixed(2)}</span>
        </div>
      </motion.div>

      {/* Checkout Action Footer */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]"
      >
        <button 
          onClick={handlePlaceOrder}
          className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-[20px] active:scale-[0.98] transition-transform shadow-xl shadow-slate-900/20"
        >
          Checkout • ${finalTotal.toFixed(2)}
        </button>
      </motion.div>
    </main>
  );
}