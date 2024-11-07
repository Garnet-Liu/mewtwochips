import { BaseModal } from "@/app/@modal/libs/components/base-modal";
import { PokemonDetail } from "@/app/(protected)/pokemon/[name]/libs/components/pokemon-detail";

interface IProps {
  params: Promise<{ name: string }>;
}

export default async function PokemonModal({ params }: Readonly<IProps>) {
  const { name } = await params;

  if (name) {
    return (
      <BaseModal>
        <PokemonDetail name={name} />
      </BaseModal>
    );
  } else {
    return <div>没找到</div>;
  }
}
