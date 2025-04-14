import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConversationProvider } from "@/context/conversationContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard with ChatGPT Integration",
  description: "A dashboard application with ChatGPT integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //Created ConversationProvider to preserve the chat conversation even when the users navigates to a different page and comes back
    <ConversationProvider>
      <TooltipProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </TooltipProvider>
    </ConversationProvider>
  );
}
