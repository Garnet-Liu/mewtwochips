export interface IQueryPokemonList {
  limit: number;
  offset: number;
}

export interface IPokemonList {
  count: number;
  next: string;
  results: Array<{ name: string; url: string }>;
}
