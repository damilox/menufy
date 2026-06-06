// src/lib/CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '@/types';

// Define what a cart item looks like (the food + how many they want)
interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.menuItem.id === menuItem.id);
      if (existingItem) {
        // If it's already in the cart, just increase the quantity
        return currentItems.map((i) =>
          i.menuItem.id === menuItem.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      // If it's new, add it with a quantity of 1
      return [...currentItems, { menuItem, quantity: 1 }];
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}