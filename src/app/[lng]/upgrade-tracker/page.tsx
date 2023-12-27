import { getTranslation } from "@/app/i18n/server";

interface Props {
  params: { lng: string };
}

export default async function Page(props: Props) {
  const { params } = props;
  const { t } = await getTranslation(params.lng, "upgradeTracker");
  return (
    <main className="container mx-auto flex w-full flex-1 flex-col gap-8 px-4">
      <p>{t("stateTracker")}</p>
      This is Upgrade tracker page.
    </main>
  );
}
