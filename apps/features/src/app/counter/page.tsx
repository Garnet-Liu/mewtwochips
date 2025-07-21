import { CounterAction } from "@/components/counter/counter-action";
import { CounterForm } from "@/components/counter/counter-form";
import { CounterStore } from "@/components/counter/counter-store";

export default function CounterPage() {
  return (
    <div className="mt-20 grid grid-cols-[30%_1fr] gap-4">
      <CounterAction />

      <CounterStore />

      <CounterForm />
    </div>
  );
}
