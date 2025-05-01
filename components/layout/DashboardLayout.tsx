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
  Bold,
} from "lucide-react";
import FloatingWidget from "../floatingWidget/FloatingWidget";
import { usePathname } from "next/navigation";
import { Switch } from "../ui/switch";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Separator } from "../ui/separator";
import { useTranslation } from "react-i18next";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "home", href: "/", icon: Home, current: true },
  { name: "aboutme", href: "/aboutme", icon: CircleUser, current: false },
  {
    name: "education",
    href: "/education",
    icon: GraduationCap,
    current: false,
  },
  { name: "experience", href: "/experience", icon: Briefcase, current: false },
  { name: "skills", href: "/skills", icon: Cpu, current: false },
  { name: "projects", href: "/projects", icon: FolderKanban, current: false },
  { name: "contact", href: "/contact", icon: ReceiptText, current: false },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [language, setLanguage] = useState("en");

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

  useEffect(() => {
    const language = localStorage.getItem("language") ?? "en";
    changeLanguage(language);
  }, []);

  function pageName() {
    switch (true) {
      case isHomePage:
        return "";
      case isAboutMePage:
        return `👶 ${t("aboutme")}`;
      case isExperiencePage:
        return `💼 ${t("experience")}`;
      case isContactPage:
        return `🧾 ${t("contact")}`;
      case isEducationPage:
        return `🎓 ${t("education")}`;
      case isSkillsPage:
        return `👨‍💻🌐 ${t("skillsandlanguage")}`;
      case isProjectsPage:
        return `📁 ${t("projects")}`;
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

  function changeLanguage(language: string) {
    if (language === "") return;

    localStorage.setItem("language", language);
    setLanguage(language);
    i18n.changeLanguage(language);
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
            <div className="flex flex-row absolute right-4 top-4 items-center gap-4">
              <ToggleGroup
                value={language}
                onValueChange={changeLanguage}
                className="gap-2"
                type="single"
              >
                <ToggleGroupItem size={"sm"} value="en">
                  EN
                </ToggleGroupItem>
                <Separator orientation="vertical" />
                <ToggleGroupItem size={"sm"} value="de">
                  DE
                </ToggleGroupItem>
              </ToggleGroup>
              <Switch checked={isDarkTheme} onCheckedChange={setTheme} />
            </div>

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
