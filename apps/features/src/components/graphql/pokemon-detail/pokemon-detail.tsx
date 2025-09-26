import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";
import type { ComponentProps } from "react";

import { PokemonState } from "@/components/graphql/pokemon-state";
import { useFragment } from "@/graphql";
import { FPokemonFragmentDoc, type QPokemonQuery } from "@/graphql/graphql";

interface IProps extends ComponentProps<"div"> {
  pokemon: QPokemonQuery["pokemon"];
}

export function PokemonDetail(props: Readonly<IProps>) {
  const { pokemon, className } = props;

  const data = useFragment(FPokemonFragmentDoc, pokemon);

  return (
    <div className={cn("flex", className)}>
      <div className="relative w-1/2">
        <div className="mt-[100%]"></div>
        {!!data?.images?.official_default && (
          <Image
            src={data.images?.official_default}
            fill
            priority
            sizes="(max-width: 1200px) 50vw, 600px"
            alt="pokemon"
            className="object-contain"
          />
        )}
      </div>

      <div className="box-border flex w-1/2 items-center p-5">
        <PokemonState stats={pokemon?.stats} color={data?.color} />
      </div>
    </div>
  );
}
