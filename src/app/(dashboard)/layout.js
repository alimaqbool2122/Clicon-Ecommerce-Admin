import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

function DashboardLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div>
            <DashboardHeader />
            <main className="bg-[#f9fafb] w-full h-screen p-6">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default DashboardLayout;
