import { Pokemon, PokemonSpecies } from "pokenode-ts";

export interface IQueryPokemonList {
  limit: number;
  offset: number;
}

export interface IPokemonList {
  count: number;
  next: string;
  results: Array<{ name: string; url: string }>;
}

export interface IPokemonResponse {
  pokemon: Pokemon;
  species: PokemonSpecies;
}
