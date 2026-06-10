// src/app/admin/layout.tsx
import React from "react";
import AdminSidebar from "./AdminSidebar";
import MobileAdminNav from "./MobileAdminNav";
// import AdminSidebar from "@/components/admin/AdminSidebar";
// import MobileAdminNav from "@/components/admin/MobileAdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-amber-500/30">
      
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <AdminSidebar />
      
      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Mobile Navigation Header (Hidden on Desktop) */}
        <MobileAdminNav/>
        
        {/* The specific page content goes here */}
        {children}
        
      </div>
    </div>
  );
}