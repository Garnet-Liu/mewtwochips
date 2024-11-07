import { PokemonDetail } from "@/app/(protected)/pokemon/[name]/libs/components/pokemon-detail";

interface IProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonDetailPage({ params }: Readonly<IProps>) {
  const { name } = await params;

  return <PokemonDetail name={name} />;
}
