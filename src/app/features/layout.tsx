import { ReactNode } from "react";

import { Navigation } from "@/app/features/components/Navigation/Navigation";

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
    <div className="flex h-screen w-screen gap-4">
      <Navigation />

      <div className="flex-1 overflow-auto bg-white/[.1]">
        {children}
        {modal}
      </div>
    </div>
  );
}
