// src/app/(customer)/[restaurant-id]/layout.tsx
import { CartProvider } from '@/lib/CartContext';
import FloatingCart from '@/components/customer/FloatingCart';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {/* A clean, edge-to-edge responsive wrapper.
        No phone simulators, just pure responsive web design.
      */}
      <div className="min-h-screen bg-[#0f1115] font-sans relative pb-24">
        {children}
        
        {/* The Floating Cart remains fixed at the bottom but centers itself on large screens */}
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-6 px-4">
          <FloatingCart />
        </div>
      </div>
    </CartProvider>
  );
}