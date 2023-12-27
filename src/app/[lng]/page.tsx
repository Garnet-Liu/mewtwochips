import { ILanguageParams } from "@/types/globals";
import { Clans, Events, Players } from "@/app/[lng]/libs";

interface Props extends ILanguageParams {}

export default function Page(props: Props) {
  const { params } = props;
  return (
    <main className="container mx-auto flex w-full flex-1 flex-col gap-8 px-4">
      <Events lng={params.lng} />

      <Players lng={params.lng} />

      <Clans lng={params.lng} />
    </main>
  );
}
