import { pokemonQuery } from "@/apollo/actions/query";
import { getClient } from "@/apollo/server";
import { PokemonDetail } from "@/components/graphql/pokemon-detail";

interface IProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonDetailPage({ params }: Readonly<IProps>) {
  const { name } = await params;

  try {
    const pokemon = await (await getClient()).query({ query: pokemonQuery, variables: { name } });
    return <PokemonDetail className="mx-auto w-3/5" pokemon={pokemon.data?.pokemon} />;
  } catch (e) {
    console.warn("pokemon query error", e);
    return null;
  }
}
