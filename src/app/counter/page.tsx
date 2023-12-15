import { PageHeader } from "@/components/PageHeader/PageHeader";
import CounterAction from "@/app/counter/components/counter-action/counter-action";

export default async function Page() {
  return (
    <div className="mx-auto mt-5 w-[1200px]">
      <PageHeader pageTitle="Counter" backRoute="/" />

      <CounterAction />
    </div>
  );
}
