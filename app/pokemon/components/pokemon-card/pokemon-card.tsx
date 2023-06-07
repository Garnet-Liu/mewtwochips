import Image from "next/image";
import Link from "next/link";

import { IPokemonResponse } from "@/interfaces/pokemon.interface";

interface IPokemonCardProps {
  name: string;
}

export default async function PokemonCard({ name }: IPokemonCardProps) {
  const fetchRequest = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pokeapi/pokemon/${name}`
    // { cache: "no-store" }
  );

  const { pokemon, species }: IPokemonResponse = await fetchRequest.json();
  const zhName = species.names.find((item) => item.language.name === "zh-Hans");
  const pokemonName = zhName?.name ?? species.name;
  const boxStyle = { borderColor: species.color.name };
  const imgSrc = pokemon.sprites.other?.["official-artwork"].front_default || "";
  return (
    <div className="w-60 p-2 flex items-center justify-center flex-col">
      <Link className="hover:scale-105 transition ease-in-out w-full" href={`/pokemon/${pokemon.name}`}>
        <div className="w-full overflow-hidden border rounded-xl flex flex-col relative" style={boxStyle}>
          <div className="w-full relative bg-white">
            <div style={{ marginTop: "100%" }}></div>
            <Image src={imgSrc} fill={true} priority={true} sizes="100%" alt="pokemon"/>
          </div>

          <div className="flex justify-between px-2 leading-10">
            <p>#{String(pokemon.id).padStart(4, "0")}</p>
            <p>{pokemonName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
