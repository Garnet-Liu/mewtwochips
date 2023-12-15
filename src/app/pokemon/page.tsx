import PokemonContent from "@/app/pokemon/components/PokemonContent/PokemonContent";
import { PageHeader } from "@/components/PageHeader/PageHeader";

export default async function Pokemon() {
  return (
    <div className="mx-auto mt-5 w-[1200px]">
      <PageHeader pageTitle="Pokemon" backRoute="/" />

      <PokemonContent />
    </div>
  );
}
