"use client";

import Link from "next/link";

import { Spin } from "@/components/spin";
import { usePokemonList } from "@/app/(protected)/pokemon/libs/hooks";
import { PokemonItem } from "@/app/(protected)/pokemon/libs/components";

interface IPokemonCardProps {
  page: number;
  rowsPage: number;
}

export function PokemonList(props: IPokemonCardProps) {
  const { page, rowsPage } = props;

  const { data, isLoading } = usePokemonList(page, rowsPage);

  return (
    <Spin loading={isLoading} className="grid min-h-[937px] grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-3">
      {(data?.pokemon || []).map((pokemon) => (
        <Link
          key={`pokemon-${pokemon.pokemon_name}`}
          className="transition ease-in-out hover:scale-105"
          href={`/pokemon/${pokemon.name}`}
        >
          <PokemonItem pokemon={pokemon} />
        </Link>
      ))}
    </Spin>
  );
}
