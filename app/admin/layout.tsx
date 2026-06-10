// src/app/admin/layout.tsx
import React from "react";
import AdminSidebar from "./AdminSidebar";
// import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-amber-500/30">
      {/* The global sidebar goes here */}
      <AdminSidebar />
      
      {/* The specific page content (Kanban, Menu Manager, etc.) goes here */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}