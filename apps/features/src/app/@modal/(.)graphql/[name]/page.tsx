import * as React from "react";

import { getClient } from "@/apollo/apollo-server";
import { pokemonQuery } from "@/apollo/client/query";
import { PokemonDetail } from "@/components/graphql/pokemon-detail";
import type { QPokemonQuery, QPokemonQueryVariables } from "@/graphql/graphql";

interface IProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonModalPage({ params }: Readonly<IProps>) {
  const { name } = await params;

  try {
    const pokemon = await getClient().query<QPokemonQuery, QPokemonQueryVariables>({
      query: pokemonQuery,
      variables: { name },
    });
    return <PokemonDetail pokemon={pokemon.data.pokemon} />;
  } catch (e) {
    console.warn("pokemon query error", e);
    return <div>没找到</div>;
  }
}
