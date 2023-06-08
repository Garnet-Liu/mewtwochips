import PageHeader from "@/app/components/page-header/page-header";
import PokemonControl from "@/app/pokemon/components/pokemon-control/pokemon-control";

export default async function Pokemon() {
  console.log("Pokemon list", process.env.NEXT_PUBLIC_API_BASE_URL);
  const dateResponse = await fetch("https://worldtimeapi.org/api/ip");
  const dateData = await dateResponse.json();
  return (
    <div className="w-[1200px] mx-auto overflow-hidden">
      <PageHeader pageTitle="Pokemon" backRoute="/" datetime={dateData?.datetime || ""}/>

      <PokemonControl/>
    </div>
  );
}


