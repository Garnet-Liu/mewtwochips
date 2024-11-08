import Image from "next/image";

import { IPokemonDetail } from "@/app/(protected)/pokemon/libs/types";
import { PokemonState } from "@/app/(protected)/pokemon/[name]/libs/components";

interface IProps {
  pokemonDetail: IPokemonDetail;
}

export function PokemonDetail(props: Readonly<IProps>) {
  const { pokemonDetail } = props;

  return (
    <>
      <div className="flex">
        <div className="relative w-1/2">
          <div className="mt-[100%]"></div>
          <Image
            src={pokemonDetail.pokemon_photo}
            fill
            sizes="full"
            className="object-cover"
            alt="pokemon"
          />
        </div>

        <div className="box-border flex w-1/2 items-center p-5">
          <PokemonState pokemon={pokemonDetail}></PokemonState>
        </div>
      </div>
    </>
  );
}
