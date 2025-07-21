import Image from "next/image";

import { QPokemonQuery } from "@/apollo/gql/graphql";
import { PokemonState } from "@/components/pokemon/pokemon-state";

interface IProps {
  pokemon: QPokemonQuery["pokemon"];
}

export function PokemonDetail(props: Readonly<IProps>) {
  const { pokemon } = props;

  return (
    <div className="flex">
      <div className="relative w-1/2">
        <div className="mt-[100%]"></div>
        {!!pokemon?.images?.official_default && (
          <Image
            src={pokemon.images?.official_default}
            fill
            priority
            sizes="(max-width: 1200px) 50vw, 600px"
            alt="pokemon"
            className="object-contain"
          />
        )}
      </div>

      <div className="box-border flex w-1/2 items-center p-5">
        <PokemonState stats={pokemon?.stats} color={pokemon?.color} />
      </div>
    </div>
  );
}
