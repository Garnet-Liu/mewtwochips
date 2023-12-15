import { headers } from "next/headers";
import Image from "next/image";

import { PageHeader } from "@/components/PageHeader/PageHeader";
import { IPokemonDetail } from "@/interfaces/pokemon.interface";
import PokemonState from "@/app/pokemon/[name]/components/pokemon-state/pokemon-state";

export default async function PokemonDetail({ params: { name } }: { params: { name: string } }) {
  const fetchRequest = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pokeapi/pokemon/${name}`,
    { headers: headers() },
  );
  const pokemonDetail: IPokemonDetail = await fetchRequest.json();
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
