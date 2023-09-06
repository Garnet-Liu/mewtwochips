"use client";

import Image from "next/image";
import { useState } from "react";

import { IPokemon } from "@/interfaces/pokemon.interface";
import cn from "classnames";

interface IPokemonItemProps {
  pokemon: IPokemon;
}

export default function PokemonItem({ pokemon }: IPokemonItemProps) {
  const [show, setShow] = useState(pokemon.show || false);
  const boxStyle = { borderColor: pokemon.pokemon_color };
  console.log("PokemonItem", show);
  return (
    <div onClick={() => setShow(!show)} className={cn("w-full overflow-hidden border rounded-xl flex flex-col relative", { "border-4": show })}
         style={boxStyle}>
      <div className="w-full relative bg-white">
        <div style={{ marginTop: "100%" }}></div>
        <Image src={pokemon.pokemon_photo} fill={true} priority={true} sizes="100%" alt="pokemon"/>
      </div>

      <div className="flex justify-between px-2 leading-10">
        <p>#{String(pokemon.id).padStart(4, "0")}</p>
        <p>{pokemon.pokemon_name}</p>
      </div>
    </div>
  );
}
