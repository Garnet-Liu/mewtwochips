import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IPokemonList, IQueryPokemonList } from "@/interfaces/pokemon.interface";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: builder => ({
    getPokemon: builder.query<IPokemonList, IQueryPokemonList>({
      query: (p) => `pokemon?offset=${p.offset}&limit=${p.limit}`
    }),
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`
    })
  })
});

export const { useGetPokemonQuery, useGetPokemonByNameQuery } = pokemonApi;
