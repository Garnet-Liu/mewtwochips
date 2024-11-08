import { ISpecies } from "@/app/api/pokeapi/pokemon/servers/request-genus";

export interface IPokemonList {
  pokemon: IPokemon[];
  count: number;
}

export interface IPokemon extends ISpecies {
  id: number;
  name: string;
  show: boolean;
  pokemon_photo: string;
}

export interface IPokemonDetail extends ISpecies {
  id: number;
  stats: IStat[];
  pokemon_photo: string;
}

export interface IStat {
  name: string;
  stat_name: string;
  base_stat: number;
}
