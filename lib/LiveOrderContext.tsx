// src/lib/LiveOrderContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// Using 'any' for menuItem to prevent TypeScript errors since your exact type is in mock-data
export interface OrderItem {
  menuItem: any; 
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'new' | 'in-progress' | 'ready';
  timestamp: Date;
}

interface LiveOrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'status' | 'timestamp'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const LiveOrderContext = createContext<LiveOrderContextType | undefined>(undefined);

export function LiveOrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (newOrder: Omit<Order, 'id' | 'status' | 'timestamp'>) => {
    const orderWithMetadata: Order = {
      ...newOrder,
      // Generates a cool, realistic order ID like "LAGOS-X7B9"
      id: 'LAGOS-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      status: 'new',
      timestamp: new Date(),
    };
    // Add the new order to the beginning of the list
    setOrders((prev) => [orderWithMetadata, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <LiveOrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </LiveOrderContext.Provider>
  );
}

export const useLiveOrders = () => {
  const context = useContext(LiveOrderContext);
  if (!context) throw new Error('useLiveOrders must be used within a LiveOrderProvider');
  return context;
};