"use client";

import Image from "next/image";

import { IPokemon } from "@/interfaces/pokemon.interface";

interface IPokemonItemProps {
  pokemon: IPokemon;
}

export default function PokemonItem({ pokemon }: IPokemonItemProps) {
  const boxStyle = { borderColor: pokemon.pokemon_color };
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border" style={boxStyle}>
      <div className="relative w-full bg-white">
        <div style={{ marginTop: "100%" }}></div>
        <Image
          src={pokemon.pokemon_photo}
          fill
          sizes="full"
          className="object-cover"
          alt="pokemon"
        />
      </div>

      <div className="flex justify-between px-2 leading-10">
        <p>#{String(pokemon.id).padStart(4, "0")}</p>
        <p>{pokemon.pokemon_name}</p>
      </div>
    </div>
  );
}
