"use client";

import Image from "next/image";

import { IPokemon } from "@/app/(protected)/pokemon/libs/types";

interface IPokemonItemProps {
  pokemon: IPokemon;
}

export function PokemonItem({ pokemon }: IPokemonItemProps) {
  const boxStyle = { borderColor: pokemon.pokemon_color };
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border" style={boxStyle}>
      <div className="relative w-full bg-white">
        <div style={{ marginTop: "100%" }}></div>
        {pokemon.pokemon_photo ? (
          <Image
            src={pokemon.pokemon_photo}
            fill
            priority
            sizes="full"
            alt="pokemon"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex justify-between px-2 leading-10">
        <p>#{String(pokemon.id).padStart(4, "0")}</p>
        <p>{pokemon.pokemon_name}</p>
      </div>
    </div>
  );
}
