import Image from "next/image";

import { apiFetchRequest } from "@/context/apiFetchRequest";
import { PageHeader } from "@/app/[lng]/features/components/PageHeader/PageHeader";
import { IPokemonDetail } from "@/app/[lng]/features/pokemon/types/pokemon.interface";
import { PokemonState } from "@/app/[lng]/features/pokemon/[name]/components/pokemon-state/pokemon-state";

export default async function PokemonDetail({ params: { name } }: { params: { name: string } }) {
  try {
    const pokemonDetail = await apiFetchRequest<IPokemonDetail>(
      `/api/features/pokeapi/pokemon/${name}`,
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
  } catch (e) {
    console.log(e);
    return null;
  }
}
