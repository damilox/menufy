// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import your providers
import { CartProvider } from "@/lib/CartContext"; 
import { LiveOrderProvider } from "@/lib/LiveOrderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naija Bites | Premium Dining",
  description: "Authentic Nigerian flavors, delivered to your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Wrap children with both providers so state is available everywhere */}
        <LiveOrderProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LiveOrderProvider>
      </body>
    </html>
  );
}