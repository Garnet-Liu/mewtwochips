
import { NamedAPIResourceList } from "pokenode-ts";
import PokemonCard from "@/app/pokemon/components/pokemon-card/pokemon-card";
import requestService from "@/services/request.service";

export default async function Pokemon() {
  const pokemonList = await requestService.get<void, NamedAPIResourceList>(
    `/api/pokeapi/pokemon?offset=0&limit=20`
  );
  return (
    <div className="w-[1200px] mx-auto">
      <h1 className="text-center text-4xl font-bold m-10">
        Pokemon
      </h1>

      <div className="flex flex-wrap">
        {pokemonList.results.map((item, index) => (
          /* @ts-expect-error Server Component */
          <PokemonCard key={index} name={item.name}></PokemonCard>
        ))}
      </div>
    </div>
  );
}
