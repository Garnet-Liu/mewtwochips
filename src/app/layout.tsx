import { Roboto } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { ReactNode } from "react";

import { Navigation } from "@/components/Navigation/Navigation";
import { NextAuthProvider } from "@/components/NextAuthProvider/NextAuthProvider";

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
  modal: ReactNode;
}

export default function RootLayout(props: ILayoutProps) {
  const { children, modal } = props;
  return (
    <html lang="en" className="dark">
      <body className={roboto.className}>
        <Theme>
          <NextAuthProvider>
            <div className="flex h-screen w-screen gap-4">
              <Navigation />

              <div className="flex-1 overflow-auto bg-white/[.1]">
                {children}
                {modal}
              </div>
            </div>
          </NextAuthProvider>
        </Theme>
      </body>
    </html>
  );
}
