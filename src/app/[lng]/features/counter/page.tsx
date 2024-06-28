import { PageHeader } from "@/app/[lng]/features/libs";
import { CounterAction } from "@/app/[lng]/features/counter/libs";

export default async function Page() {
  console.log("Counter Page");
  return (
    <div className="mx-auto mt-5 w-[1200px]">
      <PageHeader pageTitle="Counter" backRoute="/" />

      <CounterAction />
    </div>
  );
}
