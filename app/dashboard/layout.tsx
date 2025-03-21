import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="grid h-screen w-full" style={{ gridTemplateColumns: "auto 1fr" }}>
        <DashboardSidebar />
        <div className="w-full overflow-auto p-6">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}