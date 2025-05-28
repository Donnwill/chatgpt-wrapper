import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConversationProvider } from "@/context/conversationContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { ChatbotProvider } from "@/context/chatbotContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import I18nProvider from "@/components/i18nProvider/I18nProvider";
import DashboardLayout from "@/components/layout/DashboardLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donn Williams",
  description: "A Portfolio application with ChatGPT integration",
  icons: "/assets/image/donn.jpeg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //Created ConversationProvider to preserve the chat conversation even when the users navigates to a different page and comes back
    <I18nProvider>
      <ConversationProvider>
        <ChatbotProvider>
          <TooltipProvider>
            <html lang="de">
              <body className={inter.className}>
                <DashboardLayout>{children}</DashboardLayout>
                <SpeedInsights />
                <Analytics />
                <Toaster />
              </body>
            </html>
          </TooltipProvider>
        </ChatbotProvider>
      </ConversationProvider>
    </I18nProvider>
  );
}
