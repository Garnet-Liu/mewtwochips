import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Events } from "@/app/clash-of-clans/componsnts/Events/Events";

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
