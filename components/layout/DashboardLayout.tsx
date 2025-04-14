"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { LayoutDashboard, Settings } from "lucide-react";
import FloatingWidget from "../floatingWidget/FloatingWidget";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, current: true },
  { name: "Settings", href: "/settings", icon: Settings, current: false },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const isDashboard = pathname === "/";
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Mobile header */}
      <header className="flex h-14 items-center px-4 border-b md:hidden">
        <div className="flex flex-1 items-center justify-between">
          <Sidebar navigation={navigation} />
          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          </div>
          <div className="w-9"></div> {/* spacer to center the title */}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <Sidebar navigation={navigation} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-foreground hidden md:block">
                  {isDashboard ? "Dashboard" : "Settings"}
                </h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* The floating widget will only be visible in the dashboard page. */}
      {isDashboard && <FloatingWidget />}
    </div>
  );
}
