import { PageHeader } from "@/app/features/components/PageHeader/PageHeader";
import { Events } from "@/app/libs";

import { Clans } from "./Clans/Clans";
import { Players } from "./Players/Players";

export default async function Page() {
  return (
    <>
      <PageHeader pageTitle="Clash of Clans" backRoute="/" />

      <Events />

      <Players />

      <Clans />
    </>
  );
}
