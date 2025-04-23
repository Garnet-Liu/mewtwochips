import { PageHeader } from "@/components/page-header";
import { Control } from "@/components/gobang/control";
import { Board } from "@/components/gobang/board";
import { languages } from "@/app/i18n/settings";
import { getT } from "@/app/i18n";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata() {
  const { t } = await getT("gobang");
  return {
    title: t("title"),
  };
}

export default async function Page() {
  const { t } = await getT("gobang");
  return (
    <div className="page-content flex flex-col">
      <PageHeader pageTitle={t("title")} backRoute="/" />

      <div className="space-y-4 pt-4">
        <Board />

        <Control />
      </div>
    </div>
  );
}
