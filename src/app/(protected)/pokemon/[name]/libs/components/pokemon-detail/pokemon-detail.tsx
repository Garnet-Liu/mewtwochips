import { headers } from "next/headers";
import Image from "next/image";

import { apiFetchRequest } from "@/lib/fetch-request";
import { PageHeader } from "@/components/page-header";
import { IPokemonDetail } from "@/app/(protected)/pokemon/libs/types";
import { PokemonState } from "@/app/(protected)/pokemon/[name]/libs/components";

interface IProps {
  name: string;
}

export async function PokemonDetail(props: Readonly<IProps>) {
  const { name } = props;

  const headersList = await headers();

  try {
    const pokemonDetail = await apiFetchRequest<IPokemonDetail>(
      `${headersList.get("x-origin")}/api/pokeapi/pokemon/${name}`,
    );
    return (
      <div className="mx-auto w-[1200px]">
        <PageHeader pageTitle={pokemonDetail.pokemon_name} backRoute="/pokemon" />

        <div className="flex">
          <div className="relative w-1/2">
            <div style={{ marginTop: "100%" }}></div>
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
      </div>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
}
