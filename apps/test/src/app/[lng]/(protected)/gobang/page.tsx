import { getT } from "@/libs/i18n";
import { Board } from "@/components/gobang/board";
import { PageHeader } from "@/components/page-header";
import { Control } from "@/components/gobang/control";
import { GobangStoreProvider } from "@/components/gobang/gobang-store";

export async function generateMetadata() {
  const { t } = await getT("gobang");
  return {
    title: t("title", { ns: "gobang" }),
  };
}

export default async function Page() {
  const { t } = await getT("gobang");
  return (
    <div className="page-content flex flex-col">
      <PageHeader pageTitle={t("title", { ns: "gobang" })} backRoute="/" />

      <div className="space-y-4 pt-4">
        <GobangStoreProvider>
          <Board />

          <Control />
        </GobangStoreProvider>
      </div>
    </div>
  );
}
