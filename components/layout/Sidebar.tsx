"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  current: boolean;
}

interface SidebarProps {
  navigation: NavigationItem[];
}

export default function Sidebar({ navigation }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavigationLinks = () => (
    <nav className="mt-5 flex-1 px-2 space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            )}
          >
            <item.icon
              className={cn(
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground group-hover:text-accent-foreground",
                "mr-3 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[280px]">
            <SheetHeader>
              <SheetTitle className="text-left">Company Dashboard</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full py-4">
              <NavigationLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-foreground">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-primary text-xl font-bold">
                  Company Dashboard
                </span>
              </div>
              <NavigationLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
