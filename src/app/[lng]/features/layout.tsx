import { ReactNode } from "react";

import { Navigation } from "@/app/[lng]/features/libs";

export const metadata = {
  title: "Mewtwochips-Features",
  description: "A site for lovers of Pokémon and chips",
};

interface ILayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout(props: ILayoutProps) {
  const { children, modal } = props;
  return (
    <div className="fixed left-0 top-0 h-screen w-screen bg-[var(--color-background)]">
      <div className="flex h-full gap-4">
        <Navigation />

        <div className="flex-1 overflow-auto bg-black/[.1] dark:bg-white/[.1]">
          {children}
          {modal}
        </div>
      </div>
    </div>
  );
}
