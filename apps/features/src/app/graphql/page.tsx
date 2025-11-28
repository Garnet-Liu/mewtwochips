import { Spin } from "@repo/ui/components/spin";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { allPokemonQuery } from "@/apollo/actions/query";
import { PreloadQuery } from "@/apollo/server";
import { PokemonTable } from "@/components/graphql/pokemon-table";

export const dynamic = "force-dynamic"; // 强制 SSR

export default function GraphqlPage() {
  return (
    <ErrorBoundary
      fallback={
        <div className="page-content -my-3">
          <div className="text-center text-red-500">加载失败，请稍后再试</div>
        </div>
      }
    >
      <div className="relative">
        <PreloadQuery query={allPokemonQuery} variables={{ offset: 0, limit: 10 }}>
          {(queryRef) => (
            <Suspense fallback={<Spin className="h-6" loading={true} />}>
              <PokemonTable queryRef={queryRef} />
            </Suspense>
          )}
        </PreloadQuery>
      </div>
    </ErrorBoundary>
  );
}
