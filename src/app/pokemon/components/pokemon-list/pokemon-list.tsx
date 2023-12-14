"use client";

import Link from "next/link";

import { useApiPokemonList } from "@/services/pokemon.service";
import PokemonItem from "@/app/pokemon/components/pokemon-list/pokemon-item/pokemon-item";

interface IPokemonCardProps {
  page: number;
  rowsPage: number;
}

export default function PokemonList(props: IPokemonCardProps) {
  const { page, rowsPage } = props;
  const { data, error, isLoading } = useApiPokemonList(page, rowsPage);

  return (
    <div className="flex min-h-[560px] flex-wrap">
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <p className="text-center text-2xl font-bold">Loading pokemon control...</p>
        </div>
      ) : error ? (
        <div className="flex w-full items-center justify-center">
          <p className="text-center text-2xl font-bold">Loading pokemon error...</p>
        </div>
      ) : (
        (data?.data?.pokemon || []).map((pokemon, index) => (
          <div key={index} className="flex w-1/5 flex-col items-center justify-center p-2">
            <Link
              className="w-full transition ease-in-out hover:scale-105"
              href={`/pokemon/${pokemon.name}`}
            >
              <PokemonItem pokemon={pokemon} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
