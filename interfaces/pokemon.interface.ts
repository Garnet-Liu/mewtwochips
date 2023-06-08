export interface IQueryPokemonList {
  limit: number;
  offset: number;
}

export interface IPokemonList {
  pokemon: IPokemon[];
  count: number;
}

export interface IPokemon {
  id: number;
  name: string;
  pokemon_name: string;
  pokemon_photo: string;
  pokemon_color: string;
}

export interface IPokemonDetail {
  id: number;
  stats: IStat[];
  pokemon_name: string;
  pokemon_color: string;
  pokemon_photo: string;
}

export interface IStat {
  name: string;
  stat_name: string;
  base_stat: number;
}
