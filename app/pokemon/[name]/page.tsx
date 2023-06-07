import Image from "next/image";

import requestService from "@/services/request.service";
import { IPokemonResponse } from "@/interfaces/pokemon.interface";
import PokemonState from "@/app/pokemon/[name]/components/pokemon-state/pokemon-state";

export default async function PokemonDetail({ params: { name } }: { params: { name: string } }) {
  const { pokemon, species } = await requestService.get<void, IPokemonResponse>(`/api/pokeapi/pokemon/${name}`);

  if (pokemon) {
    const imgSrc = pokemon.sprites.other?.["official-artwork"].front_default || "";
    return (
      <div className="w-[1200px] mx-auto">
        <div className="flex">
          <div className="w-1/2 relative">
            <div style={{ marginTop: "100%" }}></div>
            <Image src={imgSrc} fill={true} priority={true} sizes="100%" alt="pokemon"/>
          </div>

          <div className="w-1/2 p-5 box-border flex items-center">
            {/* @ts-expect-error Server Component */}
            <PokemonState color={species.color.name} stats={pokemon.stats}></PokemonState>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
}
