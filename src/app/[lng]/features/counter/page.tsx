import { CounterAction } from "@/app/[lng]/features/counter/libs";
import { PageHeader } from "@/app/[lng]/features/components/PageHeader/PageHeader";

export default async function Page() {
  console.log("Counter Page");
  return (
    <div className="mx-auto mt-5 w-[1200px]">
      <PageHeader pageTitle="Counter" backRoute="/" />

      <CounterAction />
    </div>
  );
}
