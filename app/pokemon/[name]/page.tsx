"use client";

import { useGetPokemonByNameQuery } from "@/redux/features/pokemon-slice";

export default function PokemonDetail({ params: { name } }: { params: { name: string } }) {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);

  console.log("data", data);
  console.log("error", error);
  console.log("isLoading", isLoading);
  // rendering logic

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  } else if (error) {
    return (
      <div>Error!!</div>
    );
  } else {
    return (
      <div>
        <h1>{data?.name}</h1>
      </div>
    );
  }
}
