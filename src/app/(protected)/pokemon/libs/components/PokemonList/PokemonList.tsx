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
    <Spin loading={isLoading} className="flex h-[840px] flex-wrap">
      {(data?.pokemon || []).map((pokemon, index) => (
        <div key={index} className="flex w-1/5 flex-col items-center justify-center p-2">
          <Link
            className="w-full transition ease-in-out hover:scale-105"
            href={`/pokemon/${pokemon.name}`}
          >
            <PokemonItem pokemon={pokemon} />
          </Link>
        </div>
      ))}
    </Spin>
  );
}
