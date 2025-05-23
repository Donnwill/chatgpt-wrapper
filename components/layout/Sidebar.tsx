"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Download,
  Github,
  Linkedin,
  LucideIcon,
  Mail,
  Menu,
  PhoneCall,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import AIAvatar from "../floatingWidget/AIAvatar";
import ExternalNavButton from "../externalNavButton/ExternalNavButton";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const language = i18n.language;

  useEffect(() => {
    let prevWidth = window.innerWidth;

    function handleResize() {
      const currWidth = window.innerWidth;

      if (prevWidth < 768 && currWidth >= 768) {
        setOpen(false);
      }
      prevWidth = currWidth;
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const NavigationLinks = () => (
    <nav className="mt-8 flex-1 px-2 space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              isActive
                ? "bg-app-sidebarActive text-app-buttonText"
                : "text-app-primarytext hover:bg-app-sidebarHover hover:text-accent-foreground",
              "group flex items-center px-2 py-2 text-sm rounded-md font-figtreeSemiBold"
            )}
          >
            <item.icon
              className={cn(
                isActive
                  ? "bg-app-sidebarActive text-app-buttonText"
                  : "text-app-primarytext group-hover:text-accent-foreground",
                "mr-3 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {t(item.name)}
          </Link>
        );
      })}
    </nav>
  );

  const ProfileInfo = () => {
    return (
      <div className="flex flex-col items-center flex-shrink-0 px-4">
        <AIAvatar className="w-32 h-32" />
        <span className="text-primary text-xl font-figtreeBold">
          Donn Williams
        </span>
        <span className="text-primary font-figtreeSemiBold">
          {t("designation")}
        </span>
        <div className="flex flex-row w-full gap-4 justify-center mt-4">
          <ExternalNavButton
            Icon={Linkedin}
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/donn-williams-a30b66105/",
                "_blank"
              )
            }
            tooltip="LinkedIn"
          />
          <ExternalNavButton
            Icon={Github}
            onClick={() => window.open("https://github.com/Donnwill", "_blank")}
            tooltip="GitHub"
          />
          <ExternalNavButton
            Icon={PhoneCall}
            onClick={() => (window.location.href = "tel:+4915510191300")}
            tooltip="Phone"
          />
          <ExternalNavButton
            Icon={Mail}
            onClick={() => (window.location.href = "mailto:donn2610@gmail.com")}
            tooltip="Email"
          />
          <a
            href={`/resume/Donn_Williams_${language}.pdf`}
            download={`Donn_Williams_${language}.pdf`}
          >
            <ExternalNavButton
              Icon={Download}
              onClick={() => {}}
              tooltip={t("downloadResume")}
            />
          </a>
        </div>
      </div>
    );
  };

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
          <SheetDescription></SheetDescription> {/*This fixes the warning*/}
          <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0 pt-4">
            <SheetHeader>
              <SheetTitle className="text-left">{ProfileInfo()}</SheetTitle>
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
          <div className="flex flex-col h-0 flex-1 bg-app-sidebar">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto small-scroll-container">
              {ProfileInfo()}
              <NavigationLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
