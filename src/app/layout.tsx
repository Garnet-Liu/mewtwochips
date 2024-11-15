import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/home/theme-provider";
import { ApolloProvider } from "@/components/home/apollo-provider";
import { FirebaseProvider } from "@/components/home/firebase-provider";

import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mewtwochips",
  description: "A site for lovers of Pokémon and chips",
};

interface IProps {
  modal: ReactNode;
  children: ReactNode;
}

export default function RootLayout({ children, modal }: Readonly<IProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <FirebaseProvider>
              <ApolloProvider>
                {children}
                {modal}
              </ApolloProvider>
            </FirebaseProvider>
          </ThemeProvider>
        </SessionProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
