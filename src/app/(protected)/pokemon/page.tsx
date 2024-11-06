import { PageHeader } from "@/components/page-header";
import { PokemonContent } from "@/app/(protected)/pokemon/libs/components";

export const metadata = {
  title: "Pokémon",
};

export default function Pokemon() {
  return (
    <div className="mx-auto w-[1200px]">
      <PageHeader pageTitle="Pokemon" backRoute="/" />

      <PokemonContent />
    </div>
  );
}
