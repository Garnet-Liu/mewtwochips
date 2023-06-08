import Image from "next/image";

import { IPokemonDetail } from "@/interfaces/pokemon.interface";
import PageHeader from "@/app/components/page-header/page-header";
import PokemonState from "@/app/pokemon/[name]/components/pokemon-state/pokemon-state";

export default async function PokemonDetail({ params: { name } }: { params: { name: string } }) {
  console.log("Pokemon detail", process.env.NEXT_PUBLIC_API_BASE_URL);
  const fetchRequest = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pokeapi/pokemon/${name}`
  );
  const pokemonDetail: IPokemonDetail = await fetchRequest.json();
  const dateResponse = await fetch("https://worldtimeapi.org/api/ip");
  const dateData = await dateResponse.json();
  console.log("pokemonDetail", pokemonDetail);
  return (
    <div className="w-[1200px] mx-auto">
      <PageHeader pageTitle={pokemonDetail.pokemon_name} backRoute="/pokemon" datetime={dateData?.datetime || ""}/>

      <div className="flex">
        <div className="w-1/2 relative">
          <div style={{ marginTop: "100%" }}></div>
          <Image src={pokemonDetail.pokemon_photo} fill={true} priority={true} sizes="100%" alt="pokemon"/>
        </div>

        <div className="w-1/2 p-5 box-border flex items-center">
          <PokemonState pokemon={pokemonDetail}></PokemonState>
        </div>
      </div>
    </div>
  );
}
