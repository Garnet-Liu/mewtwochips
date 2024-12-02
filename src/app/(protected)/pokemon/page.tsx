import { Suspense } from "react";

import { baseFetchJson } from "@/lib/fetch-request";
import { PageHeader } from "@/components/page-header";
import { PreloadQuery } from "@/apollo/apollo-server";
import { allPokemonQuery } from "@/apollo/client/query";
import { PokemonContent } from "@/components/pokemon/pokemon-content";
import { PokemonSkeleton } from "@/components/pokemon/pokemon-skeleton";

export default function Page() {
  const countPromise = baseFetchJson<{
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
