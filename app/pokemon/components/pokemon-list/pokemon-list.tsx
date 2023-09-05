"use client";

import Link from "next/link";

import { useApiPokemonList } from "@/services/pokemon.service";
import PokemonItem from "@/app/pokemon/components/pokemon-list/pokemon-item/pokemon-item";

interface IPokemonCardProps {
  page: number;
}

export default function PokemonList({ page }: IPokemonCardProps) {
  const { data, error, isLoading } = useApiPokemonList(page);

  console.log('data', data)

  const pokemon = (data?.data?.pokemon || []).map((p) => {
    return {
      ...p,
      show: false
    }
  })

  console.log('pokemon', pokemon);

  return (
    <div className="flex flex-wrap min-h-[560px]">
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <p className="text-2xl text-center font-bold">Loading pokemon control...</p>
        </div>
      ) : error ? (
        <div className="w-full flex items-center justify-center">
          <p className="text-2xl text-center font-bold">Loading pokemon error...</p>
        </div>
      ) : (
        (pokemon).map((pokemon, index) => (
          <div key={index} className="w-1/5 p-2 flex items-center justify-center flex-col">
            {/*<Link className="hover:scale-105 transition ease-in-out w-full" href={`/pokemon/${pokemon.name}`}>*/}
              <PokemonItem pokemon={pokemon}/>
            {/*</Link>*/}
          </div>
        ))
      )}
    </div>
  );
}
