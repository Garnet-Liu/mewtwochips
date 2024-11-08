import { headers } from "next/headers";

import { apiFetchRequest } from "@/lib/fetch-request";
import { PageHeader } from "@/components/page-header";
import { IPokemonDetail } from "@/app/(protected)/pokemon/libs/types";
import { PokemonDetail } from "@/app/(protected)/pokemon/[name]/libs/components/pokemon-detail";

interface IProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonDetailPage({ params }: Readonly<IProps>) {
  const { name } = await params;

  const headersList = await headers();

  try {
    const pokemonDetail = await apiFetchRequest<IPokemonDetail>(
      `${headersList.get("x-origin")}/api/pokeapi/pokemon/${name}`,
      { headers: [...headersList.entries()] },
    );
    return (
      <div className="mx-auto w-[1200px]">
        <PageHeader pageTitle={pokemonDetail.pokemon_name} backRoute="/pokemon" />

        <PokemonDetail pokemonDetail={pokemonDetail} />
      </div>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
}
