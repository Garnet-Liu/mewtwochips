import { Roboto } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { ReactNode } from "react";

import { Footer, Header } from "@/app/libs";
import { DarkProviders, NextAuthProvider } from "@/components";

import "@radix-ui/themes/styles.css";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata = {
  title: "Mewtwochips",
  description: "A site for lovers of Pokémon and chips",
};

interface ILayoutProps {
  children: ReactNode;
}

export default function RootLayout(props: ILayoutProps) {
  const { children } = props;
  return (
    <html suppressHydrationWarning className={roboto.className}>
      <body>
        <DarkProviders attribute="class">
          <Theme>
            <NextAuthProvider>
              <main className="flex h-screen w-screen flex-col overflow-auto">
                <Header />
                {children}
                <Footer />
              </main>
            </NextAuthProvider>
          </Theme>
        </DarkProviders>
      </body>
    </html>
  );
}
