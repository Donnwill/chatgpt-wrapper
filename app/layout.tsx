import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConversationProvider } from "@/context/conversationContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { ChatbotProvider } from "@/context/chatbotContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    <ConversationProvider>
      <ChatbotProvider>
        <TooltipProvider>
          <html lang="en">
            <body className={inter.className}>
              {children}
              <SpeedInsights />
              <Analytics />
            </body>
          </html>
        </TooltipProvider>
      </ChatbotProvider>
    </ConversationProvider>
  );
}
