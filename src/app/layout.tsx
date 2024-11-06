import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { ReactNode } from "react";

import { FirebaseProvider } from "@/app/libs/components/firebase-provider";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <FirebaseProvider>
            {children}
            {modal}
          </FirebaseProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
