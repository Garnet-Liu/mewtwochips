import { getPokemonDetail } from "@/servers/pokemon-detail.service";
import { PokemonDetail } from "@/app/(protected)/pokemon/[name]/libs/components/pokemon-detail";

interface IProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonModal({ params }: Readonly<IProps>) {
  const { name } = await params;

  try {
    const pokemonDetail = await getPokemonDetail(name);
    return (
      <div className="mx-auto w-[1200px] bg-white">
        <PokemonDetail pokemonDetail={pokemonDetail} />
      </div>
    );
  } catch (e) {
    console.log(e);
    return <div>没找到</div>;
  }
}
