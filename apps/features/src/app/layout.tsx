import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";

import { ApolloProvider } from "@/components/apollo-provider";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Mewtwochips - features",
  description: "A site for lovers of Pokémon and chips",
};

type Props = PropsWithChildren<{ modal: ReactNode }>;

export default function RootLayout({ modal, children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloProvider>
            <SidebarProvider>
              <AppSidebar />

              <SidebarInset>
                <AppHeader />

                <section className="flex flex-1 flex-col gap-4 p-4">
                  {children}
                  {modal}
                </section>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
