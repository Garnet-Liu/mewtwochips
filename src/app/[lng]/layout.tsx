import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { dir } from "i18next";

import { LngParams } from "@/types/lng-params";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/home/theme-provider";
import { ReduxProvider } from "@/components/home/redux-provider";
import { ApolloProvider } from "@/components/home/apollo-provider";
import { FirebaseProvider } from "@/components/home/firebase-provider";

import "./globals.css";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mewtwochips",
  description: "A site for lovers of Pokémon and chips",
};

interface IProps extends LngParams {
  modal: ReactNode;
  children: ReactNode;
}

export default async function RootLayout({ children, modal, params }: Readonly<IProps>) {
  const { lng } = await params;
  return (
    <html
      lang={lng}
      dir={dir(lng)}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <FirebaseProvider>
              <ApolloProvider>
                <ReduxProvider>
                  {children}
                  {modal}
                </ReduxProvider>
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
