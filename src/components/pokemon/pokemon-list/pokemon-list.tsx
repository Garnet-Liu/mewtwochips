"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Spin } from "@/components/spin";
import { QAllPokemonQuery } from "@/apollo/gql/graphql";
import { PokemonItem } from "@/components/pokemon/pokemon-list";

interface IProps {
  isLoading: boolean;
  pokemon: NonNullable<QAllPokemonQuery["pokemonAll"]>["results"];
}

export function PokemonList(props: IProps) {
  const { isLoading, pokemon } = props;

  return (
    <Spin
      loading={isLoading}
      // content={<PokemonSkeleton className="absolute bottom-0 left-0 right-0 top-0" />}
      className={cn("grid min-h-[1009px] grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-3")}
    >
      {(pokemon || []).map((pokemon) => (
        <Link
          key={`pokemon-${pokemon?.id}`}
          className="transition ease-in-out hover:scale-105"
          href={`/pokemon/${pokemon?.name_id}`}
        >
          <PokemonItem pokemon={pokemon} />
        </Link>
      ))}
    </Spin>
  );
}
