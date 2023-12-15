import { ReactNode } from "react";

export const metadata = {
  title: "Mewtwochips-Clash Of Clans",
  description: "A site for lovers of Pokémon and chips",
};

interface ILayoutProps {
  children: ReactNode;
}

export default function RootLayout(props: ILayoutProps) {
  const { children } = props;
  return <div className="mx-auto w-[1200px] py-4">{children}</div>;
}
