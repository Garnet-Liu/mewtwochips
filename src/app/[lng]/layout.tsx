import { Roboto } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { ReactNode } from "react";
import { dir } from "i18next";

import { Footer, Header } from "@/app/[lng]/libs";
import { languages } from "@/context/i18nSettings";
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
  params: { lng: string };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout(props: ILayoutProps) {
  const { children, params } = props;
  return (
    <html
      suppressHydrationWarning
      className={roboto.className}
      lang={params.lng}
      dir={dir(params.lng)}
    >
      <body>
        <DarkProviders attribute="class">
          <Theme>
            <NextAuthProvider>
              <main className="flex h-screen w-screen flex-col overflow-auto">
                <Header lng={params.lng} />
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
