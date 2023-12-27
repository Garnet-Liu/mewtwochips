import { Events } from "../[lng]/libs";
import { Clans } from "./Clans/Clans";
import { Players } from "./Players/Players";
import { PageHeader } from "@/app/[lng]/features/components/PageHeader/PageHeader";

export default async function Page() {
  return (
    <>
      <PageHeader pageTitle="Clash of Clans" backRoute="/" />

      <Events lng="zh" />

      <Players />

      <Clans />
    </>
  );
}
