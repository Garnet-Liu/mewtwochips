import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";

import "./globals.css";

const clashRegular = localFont({
  variable: "--font-clash-regular",
  src: "../fonts/clash_regular.otf",
});

const clashBold = localFont({
  variable: "--font-clash-bold",
  src: "../fonts/clash_bold.otf",
});

export const metadata: Metadata = {
  title: "Mewtwochips",
  description: "Clash of Clans Upgrade Tracker - Mewtwochips",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${clashRegular.variable} ${clashBold.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="flex min-h-svh w-full flex-col">
            <AppHeader />

            <section className="container mx-auto flex-1 p-4 xl:px-0">{children}</section>

            <AppFooter />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
