import { PageHeader } from "@/app/[lng]/features/libs";
import { PokemonContent } from "./components/PokemonContent/PokemonContent";

export default async function Pokemon() {
  return (
    <div className="mx-auto mt-5 w-[1200px]">
      <PageHeader pageTitle="Pokemon" backRoute="/" />

      <PokemonContent />
    </div>
  );
}
