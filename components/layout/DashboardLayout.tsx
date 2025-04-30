"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
  CircleUser,
  Briefcase,
  ReceiptText,
  Home,
  GraduationCap,
  Cpu,
  FolderKanban,
} from "lucide-react";
import FloatingWidget from "../floatingWidget/FloatingWidget";
import { usePathname } from "next/navigation";
import { Switch } from "../ui/switch";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Home", href: "/", icon: Home, current: true },
  { name: "About Me", href: "/aboutme", icon: CircleUser, current: false },
  {
    name: "Education",
    href: "/education",
    icon: GraduationCap,
    current: false,
  },
  { name: "Experience", href: "/experience", icon: Briefcase, current: false },
  { name: "Skills", href: "/skills", icon: Cpu, current: false },
  { name: "Projects", href: "/projects", icon: FolderKanban, current: false },
  { name: "Contact", href: "/contact", icon: ReceiptText, current: false },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isContactPage = pathname === "/contact";
  const isExperiencePage = pathname === "/experience";
  const isAboutMePage = pathname === "/aboutme";
  const isEducationPage = pathname === "/education";
  const isSkillsPage = pathname === "/skills";
  const isProjectsPage = pathname === "/projects";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkTheme();
      setIsDarkTheme(true);
    } else {
      setLightTheme();
      setIsDarkTheme(false);
    }
  }, []);

  function pageName() {
    switch (true) {
      case isHomePage:
        return "";
      case isAboutMePage:
        return "👶 About Me";
      case isExperiencePage:
        return "💼 Experience";
      case isContactPage:
        return "🧾 Contact";
      case isEducationPage:
        return "🎓 Education";
      case isSkillsPage:
        return "👨‍💻🌐 Skills And Language";
      case isProjectsPage:
        return "📁 Projects";
      default:
        return "";
    }
  }

  function setTheme(isDarkTheme: boolean) {
    const theme = isDarkTheme ? "dark" : "light";
    if (theme === "dark") {
      setDarkTheme();
    } else {
      setLightTheme();
    }
    localStorage.setItem("theme", theme);
    setIsDarkTheme(isDarkTheme);
  }

  function setDarkTheme() {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }

  function setLightTheme() {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Mobile header */}
      <header className="flex h-14 items-center px-4 border-b md:hidden">
        <div className="flex flex-1 items-center justify-between">
          <Sidebar navigation={navigation} />
          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-figtreeBold text-foreground">
              {pageName()}
            </h1>
          </div>
          <div className="w-9"></div> {/* spacer to center the title */}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <Sidebar navigation={navigation} />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <main
            style={{ backgroundImage: "var(--app-background)" }}
            className="flex-1 relative overflow-y-auto scroll-container focus:outline-none"
          >
            <Switch
              className="absolute right-4 top-4"
              checked={isDarkTheme}
              onCheckedChange={setTheme}
            />
            <div className="py-6">
              <div className="mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-3xl font-figtreeBold text-app-primarytext hidden md:block">
                  {pageName()}
                </h1>
              </div>
              <div className="mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {!isContactPage && <FloatingWidget />}
    </div>
  );
}
