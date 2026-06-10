// src/app/(customer)/[restaurant-id]/cart/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { ArrowLeft, Receipt, ChevronRight, Lock, CreditCard, Landmark, Banknote, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { items, totalPrice } = useCart();
  const params = useParams();
  const restaurantId = params['restaurant-id'];

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'cash' | null>(null);

  // Removed the tax and finalTotal calculations. We will just use `totalPrice` directly.

  const handleSimulatePayment = (method: 'card' | 'transfer' | 'cash') => {
    setPaymentMethod(method);
    setPaymentStatus('processing');
    
    // If cash, process quickly. If digital, simulate network delay.
    const delay = method === 'cash' ? 800 : 2500;

    setTimeout(() => {
      setPaymentStatus('success');
      
      // Show success screen, then hard-redirect to clear the memory cart state
      setTimeout(() => {
        window.location.href = `/${restaurantId}/menu`; 
      }, method === 'cash' ? 3500 : 2000); 
    }, delay);
  };

  // Premium Dark Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex flex-col items-center justify-center p-6 text-center font-sans">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-[#1A1D24] rounded-[32px] shadow-[0_0_40px_rgba(245,158,11,0.05)] border border-white/5 flex items-center justify-center mb-6 relative"
        >
          <div className="absolute inset-0 bg-amber-500/10 rounded-[32px] blur-xl" />
          <Receipt className="w-10 h-10 text-amber-500 relative z-10" />
        </motion.div>
        <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">Your tray is empty</h2>
        <p className="text-slate-400 font-medium mb-10 max-w-sm">
          Looks like you haven't selected any of our signature dishes yet.
        </p>
        <Link href={`/${restaurantId}/menu`} className="active:scale-95 transition-transform">
          <button className="bg-white/10 hover:bg-white/15 text-white border border-white/10 px-8 py-4 rounded-full font-bold shadow-xl transition-colors">
            Return to Menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f1115] pb-40 font-sans selection:bg-amber-500/30">
      
      {/* Glassmorphic Header */}
      <header className="bg-[#0f1115]/80 backdrop-blur-xl px-4 py-5 sticky top-0 z-30 border-b border-white/5 flex items-center gap-4">
        <div className="max-w-2xl mx-auto w-full flex items-center gap-4">
          <Link href={`/${restaurantId}/menu`} className="p-2 -ml-2 bg-white/5 hover:bg-white/10 active:scale-95 rounded-full transition-all border border-white/5">
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </Link>
          <h1 className="text-xl font-extrabold text-white tracking-tight">Review Order</h1>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className="max-w-2xl mx-auto w-full">
        {/* Order Items List */}
        <div className="p-4 space-y-4 mt-4">
          {items.map((item, index) => (
            <motion.div 
              key={item.menuItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24, delay: index * 0.1 }}
              className="flex items-center justify-between p-5 bg-[#1A1D24]/60 backdrop-blur-md rounded-[24px] shadow-sm border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0f1115] text-amber-500 border border-white/5 font-black rounded-[14px] flex items-center justify-center shrink-0 text-lg shadow-inner">
                  {item.quantity}x
                </div>
                <div>
                  <h3 className="font-bold text-white text-[16px] leading-tight mb-1">{item.menuItem.name}</h3>
                  <p className="text-sm text-slate-400 font-medium">₦{item.menuItem.price.toLocaleString()} each</p>
                </div>
              </div>
              <span className="font-extrabold text-white text-lg">
                ₦{(item.menuItem.price * item.quantity).toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Simplified Order Summary Receipt */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: items.length * 0.1 }}
          className="mx-4 mt-6 p-7 bg-[#1A1D24] rounded-[32px] shadow-xl border border-white/5 space-y-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
          <h3 className="font-extrabold text-white text-lg mb-4 relative z-10">Payment Summary</h3>
          
          <div className="flex justify-between items-end relative z-10">
            <span className="font-bold text-slate-400 text-sm mb-1.5">Total due</span>
            <span className="font-black text-amber-500 text-3xl tracking-tight">₦{totalPrice.toLocaleString()}</span>
          </div>
        </motion.div>
      </div>

      {/* Checkout Action Footer */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 z-40 p-5 bg-[#0f1115]/90 backdrop-blur-xl border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-2xl mx-auto w-full">
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="w-full relative group overflow-hidden bg-amber-500 text-[#0f1115] font-black text-lg py-4 sm:py-5 rounded-[20px] active:scale-[0.98] transition-transform shadow-[0_0_30px_rgba(245,158,11,0.15)] flex items-center justify-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              Proceed to Checkout
              <span className="w-1.5 h-1.5 bg-[#0f1115]/30 rounded-full mx-1" /> 
              ₦{totalPrice.toLocaleString()}
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>
        </div>
      </motion.div>

      {/* --- PAYMENT SIMULATION MODAL --- */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => paymentStatus === 'idle' && setShowPaymentModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[#0f1115] border border-white/10 rounded-[32px] p-6 relative z-10 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  Secured Checkout
                </div>
                <div className="bg-amber-500/10 text-amber-500 text-xs font-bold px-2.5 py-1 rounded-md border border-amber-500/20">
                  TEST MODE
                </div>
              </div>

              {/* Payment States */}
              {paymentStatus === 'idle' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-slate-400 text-sm font-medium mb-1">Total Amount</p>
                    <h2 className="text-3xl font-black text-white">₦{totalPrice.toLocaleString()}</h2>
                  </div>

                  <div className="space-y-3">
                    <button onClick={() => handleSimulatePayment('card')} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-amber-500" />
                        <span className="text-white font-semibold">Pay with Card</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    </button>
                    <button onClick={() => handleSimulatePayment('transfer')} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Landmark className="w-5 h-5 text-emerald-400" />
                        <span className="text-white font-semibold">Pay via Transfer</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    </button>
                    <button onClick={() => handleSimulatePayment('cash')} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Banknote className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-semibold">Pay at Counter (Cash/POS)</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    </button>
                  </div>
                </div>
              )}

              {paymentStatus === 'processing' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                  <p className="text-white font-bold text-lg">Processing Request...</p>
                  <p className="text-slate-400 text-sm">Please wait a moment.</p>
                </div>
              )}

              {paymentStatus === 'success' && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8 space-y-4 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <div>
                    {paymentMethod === 'cash' ? (
                      <>
                        <h3 className="text-2xl font-black text-white mb-2">Order Confirmed!</h3>
                        <p className="text-slate-400 leading-relaxed max-w-[250px] mx-auto">
                          Your order <span className="text-amber-500 font-bold">#LAGOS-4092</span> is with the kitchen. Please pay ₦{totalPrice.toLocaleString()} at the counter.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-black text-white mb-2">Payment Successful!</h3>
                        <p className="text-slate-400">Order <span className="text-amber-500 font-bold">#LAGOS-4092</span> sent to kitchen.</p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}