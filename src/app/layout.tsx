import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}>
        <SessionProvider>
          <FirebaseProvider>
            <ApolloProvider>
              {children}
              {modal}
            </ApolloProvider>
          </FirebaseProvider>
        </SessionProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
