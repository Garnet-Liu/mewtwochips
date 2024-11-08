import { ReactNode } from "react";

export const metadata = {
  title: "Pokémon",
};

interface IProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: Readonly<IProps>) {
  return <>{children}</>;
}
