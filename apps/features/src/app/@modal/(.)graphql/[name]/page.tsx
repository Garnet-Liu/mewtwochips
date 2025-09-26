import * as React from "react";

import { pokemonQuery } from "@/apollo/actions/query";
import { getClient } from "@/apollo/server";
import { PokemonDetail } from "@/components/graphql/pokemon-detail";

interface IProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonModalPage({ params }: Readonly<IProps>) {
  const { name } = await params;

  try {
    const client = await getClient();
    const pokemon = await client.query({ query: pokemonQuery, variables: { name } });
    return <PokemonDetail pokemon={pokemon.data?.pokemon} />;
  } catch (e) {
    console.warn("pokemon query error", e);
    return <div>没找到</div>;
  }
}
