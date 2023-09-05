import PageHeader from "@/app/components/page-header/page-header";
import CounterAction from "@/app/counter/components/counter-action/counter-action";

export default async function Counter() {
  return (
    <div className="w-[1200px] mx-auto bg-white mt-5">
      {/* @ts-expect-error Server Component */}
      <PageHeader pageTitle="Counter" backRoute="/"/>

      <CounterAction/>
    </div>
  );
}
