import { Pokemon, Stat } from "pokenode-ts";

import { baseFetchRequest } from "@/lib/fetch-request";
import { IPokemonDetail } from "@/app/(protected)/pokemon/libs/types";
import { requestName, requestSpecies } from "@/app/api/pokeapi/pokemon/servers/request-genus";

export const getPokemonDetail = async (name: string): Promise<IPokemonDetail> => {
  const p = await baseFetchRequest<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const species = await requestSpecies(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  const stats = await Promise.allSettled(
    p.stats.map((stat) => baseFetchRequest<Stat>(stat.stat.url)),
  );
  const statData = stats.map((r) => (r.status === "fulfilled" ? r.value : null));
  return {
    id: p.id,
    ...species,
    pokemon_photo: p.sprites.other?.["official-artwork"].front_default || "",
    stats: statData.map((stat_1) => {
      const base_stat = p.stats.find((item) => item.stat.name === stat_1?.name);
      return {
        name: stat_1?.name ?? "",
        stat_name: requestName(stat_1?.names ?? []) ?? stat_1?.name,
        base_stat: base_stat?.base_stat ?? 0,
      };
    }),
  };
};
