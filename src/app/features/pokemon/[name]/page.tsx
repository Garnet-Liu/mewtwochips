import Image from "next/image";

import { env } from "../../../../../env.mjs";
import { baseFetchRequest } from "@/context/fetch-request";
import { PageHeader } from "@/app/features/components/PageHeader/PageHeader";
import { IPokemonDetail } from "@/app/features/pokemon/types/pokemon.interface";
import { PokemonState } from "@/app/features/pokemon/[name]/components/pokemon-state/pokemon-state";

export default async function PokemonDetail({ params: { name } }: { params: { name: string } }) {
  const pokemonDetail = await baseFetchRequest<IPokemonDetail>(
    `${env.NEXT_PUBLIC_API_BASE_URL}/api/features/pokeapi/pokemon/${name}`,
  );
  return (
    <div className="mx-auto w-[1200px]">
      <PageHeader pageTitle={pokemonDetail.pokemon_name} backRoute="/pokemon" />

      <div className="flex">
        <div className="relative w-1/2">
          <div style={{ marginTop: "100%" }}></div>
          <Image
            src={pokemonDetail.pokemon_photo}
            fill
            sizes="full"
            className="object-cover"
            alt="pokemon"
          />
        </div>

        <div className="box-border flex w-1/2 items-center p-5">
          <PokemonState pokemon={pokemonDetail}></PokemonState>
        </div>
      </div>
    </div>
  );
}
