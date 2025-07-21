import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { Toaster } from "@repo/ui/components/sonner";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Mewtwochips - features",
  description: "A site for lovers of Pokémon and chips",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
              <AppHeader />

              <section className="flex flex-1 flex-col gap-4 p-4">{children}</section>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
