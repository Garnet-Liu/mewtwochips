import { useGetPokemonQuery } from "@/redux/features/pokemon-slice";

export default function Pokemon() {
  // const { data, error, isLoading } = useGetPokemonQuery({ offset: 1, limit: 20 });
  //
  // if (isLoading) {
  //   return (
  //     <div>Loading...</div>
  //   );
  // } else if (error) {
  //   return (
  //     <div>Error!!</div>
  //   );
  // } else if (data) {
  //   return (
  //     <div>
  //       {data.results.map((pokemon) => (
  //         <div key={pokemon.name}>
  //           <h1>{pokemon.name}</h1>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // } else {
  // }
  return <div>完全没找到</div>;
}
