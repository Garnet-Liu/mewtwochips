"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Spin } from "@/components/spin";
import { usePokemonList } from "@/app/(protected)/pokemon/libs/hooks";
import { PokemonItem } from "@/app/(protected)/pokemon/libs/components/pokemon-list";
import { PokemonSkeleton } from "@/app/(protected)/pokemon/libs/components/pokemon-skeleton";

interface IPokemonCardProps {
  page: number;
  rowsPage: number;
}

export function PokemonList(props: IPokemonCardProps) {
  const { page, rowsPage } = props;

  const { data, isLoading } = usePokemonList(page, rowsPage);

  return (
    <Spin
      loading={isLoading}
      content={<PokemonSkeleton className="absolute bottom-0 left-0 right-0 top-0" />}
      className={cn("grid min-h-[1009px] grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-3")}
    >
      {(data?.pokemon || []).map((pokemon) => (
        <Link
          key={`pokemon-${pokemon.id}`}
          className="transition ease-in-out hover:scale-105"
          href={`/pokemon/${pokemon.name}`}
        >
          <PokemonItem pokemon={pokemon} />
        </Link>
      ))}
    </Spin>
  );
}
