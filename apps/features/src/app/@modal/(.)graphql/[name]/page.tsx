"use client";

import { useQuery } from "@apollo/client/react";
import { Spin } from "@repo/ui/components/spin";
import { useParams } from "next/navigation";

import { pokemonQuery } from "@/apollo/actions/query";
import { PokemonDetail } from "@/components/graphql/pokemon-detail";

export default function PokemonModalPage() {
  const { name } = useParams<{ name: string }>();

  const { data, loading, error } = useQuery(pokemonQuery, { variables: { name } });

  if (loading || error) {
    return (
      <div className="flex aspect-2/1 items-center justify-center">
        {error ? error?.message : <Spin loading={true} />}
      </div>
    );
  }

  return <PokemonDetail pokemon={data?.pokemon} />;
}
