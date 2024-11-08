import { headers } from "next/headers";

import { apiFetchRequest } from "@/lib/fetch-request";
import { BaseModal } from "@/app/@modal/libs/components/base-modal";
import { IPokemonDetail } from "@/app/(protected)/pokemon/libs/types";
import { PokemonDetail } from "@/app/(protected)/pokemon/[name]/libs/components/pokemon-detail";

interface IProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonModal({ params }: Readonly<IProps>) {
  const { name } = await params;

  const headersList = await headers();

  try {
    console.log('headersList.get("x-origin")', headersList.get("x-origin"));

    const headerValues: Record<string, string> = {};
    headersList.forEach((value, key) => {
      headerValues[key] = value;
    });

    console.log("headerValues", headerValues);

    const pokemonDetail = await apiFetchRequest<IPokemonDetail>(
      `${headersList.get("x-origin")}/api/pokeapi/pokemon/${name}`,
      { headers: headerValues },
    );
    return (
      <BaseModal>
        <div className="mx-auto w-[1200px] bg-white">
          <PokemonDetail pokemonDetail={pokemonDetail} />
        </div>
      </BaseModal>
    );
  } catch (e) {
    console.log(e);
    return <div>没找到</div>;
  }
}
