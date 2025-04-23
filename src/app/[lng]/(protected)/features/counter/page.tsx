import { CounterForm } from "@/components/counter/counter-form";
import { CounterRedux } from "@/components/counter/counter-redux";
import { CounterAction } from "@/components/counter/counter-action";

export default function Page() {
  return (
    <div className="mt-20 grid grid-cols-[30%_1fr] gap-4">
      <CounterAction />

      <CounterRedux />

      <CounterForm />
    </div>
  );
}
