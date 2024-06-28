import {
  RandomizerCase,
  SelectMenuCase,
  SlotMachineCase,
} from "@/app/[lng]/features/test-case/libs";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-12">
      <RandomizerCase />

      <SlotMachineCase />

      <SelectMenuCase />
    </div>
  );
}
