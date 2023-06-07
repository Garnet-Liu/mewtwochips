import PokemonCard from "@/app/pokemon/components/pokemon-card/pokemon-card";

export default function Pokemon() {
  return (
    <div className="w-[1200px] mx-auto">
      <h1 className="text-center text-4xl font-bold m-10">
        Pokemon
      </h1>

      <div className="flex flex-wrap">
        {new Array(20).fill(1).map((item, index) => (
          /* @ts-expect-error Server Component */
          <PokemonCard key={index} id={index + 1}></PokemonCard>
        ))}
      </div>
    </div>
  );
}
