import { Suspense } from "react";

import { PageHeader } from "@/components/page-header";
import { baseFetchRequest } from "@/lib/fetch-request";
import { PokemonContent } from "@/app/(protected)/pokemon/libs/components/pokemon-content";
import { PokemonSkeleton } from "@/app/(protected)/pokemon/libs/components/pokemon-skeleton";

export default function Page() {
  const commentsPromise = baseFetchRequest<{
    count: number;
  }>("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1");

  return (
    <div className="mx-auto flex w-[1200px] flex-col gap-4 py-4">
      <PageHeader pageTitle="Pokemon" backRoute="/" />

      <Suspense fallback={<PokemonSkeleton />}>
        <PokemonContent commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
}
