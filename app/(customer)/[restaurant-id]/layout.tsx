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
      {/* This renders the menu page */}
      {children} 
      
      {/* This renders the floating cart over the menu */}
      <FloatingCart />
    </CartProvider>
  );
}