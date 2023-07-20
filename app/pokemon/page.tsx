import PageHeader from "@/app/components/page-header/page-header";
import PokemonControl from "@/app/pokemon/components/pokemon-control/pokemon-control";

export default async function Pokemon() {
  console.log("Pokemon list", process.env.NEXT_PUBLIC_API_BASE_URL);
  return (
    <div className="w-[1200px] mx-auto bg-white mt-5">
      {/* @ts-expect-error Server Component */}
      <PageHeader pageTitle="Pokemon" backRoute="/"/>

      <PokemonControl/>
    </div>
  );
}


