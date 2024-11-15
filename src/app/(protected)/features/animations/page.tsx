import { RandomizerCase } from "@/components/animations/randomizer-case";
import { SlotMachineCase } from "@/components/animations/slot-machine-case";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <Tabs defaultValue="randomizer" className="max-width py-4">
      <TabsList>
        <TabsTrigger value="randomizer">Randomizer</TabsTrigger>
        <TabsTrigger value="slotMachine">SlotMachine</TabsTrigger>
      </TabsList>

      <TabsContent value="randomizer">
        <SlotMachineCase />
      </TabsContent>

      <TabsContent value="slotMachine">
        <RandomizerCase />
      </TabsContent>
    </Tabs>
  );
}
