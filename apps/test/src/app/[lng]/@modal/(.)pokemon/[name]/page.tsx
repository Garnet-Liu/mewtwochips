import { getClient } from "@/apollo/apollo-server";
import { pokemonQuery } from "@/apollo/client/query";
import { PokemonDetail } from "@/components/pokemon/pokemon-detail";

interface IProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonModal({ params }: Readonly<IProps>) {
  const { name } = await params;

  try {
    const pokemon = await getClient().query({ query: pokemonQuery, variables: { name } });
    return (
      <div className="page-content -my-3">
        <PokemonDetail pokemon={pokemon.data.pokemon} />
      </div>
    );
  } catch (e) {
    console.warn("pokemon query error", e);
    return <div>没找到</div>;
  }
}
