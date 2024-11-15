import { Suspense } from "react";

import { PageHeader } from "@/components/page-header";
import { PreloadQuery } from "@/apollo/apollo-server";
import { baseFetchRequest } from "@/lib/fetch-request";
import { allPokemonQuery } from "@/apollo/client/query";
import { PokemonContent } from "@/components/pokemon/pokemon-content";
import { PokemonSkeleton } from "@/components/pokemon/pokemon-skeleton";

export default function Page() {
  const countPromise = baseFetchRequest<{
    count: number;
  }>("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1");

  return (
    <div className="flex flex-col gap-4">
      <PageHeader pageTitle="Pokemon" backRoute="/" />

      <PreloadQuery query={allPokemonQuery} variables={{ offset: 0, limit: 15 }}>
        {(queryRef) => (
          <Suspense fallback={<PokemonSkeleton />}>
            <PokemonContent countPromise={countPromise} queryRef={queryRef} />
          </Suspense>
        )}
      </PreloadQuery>
    </div>
  );
}
