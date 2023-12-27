import { PageHeader } from "@/app/[lng]/features/components/PageHeader/PageHeader";
import { PokemonContent } from "@/app/[lng]/features/pokemon/components/PokemonContent/PokemonContent";

export default async function Pokemon() {
  return (
    <div className="mx-auto mt-5 w-[1200px]">
      <PageHeader pageTitle="Pokemon" backRoute="/" />

      <PokemonContent />
    </div>
  );
}
