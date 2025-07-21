import { RandomizerCase } from "@/components/animations/randomizer-case";
import { SlotMachineCase } from "@/components/animations/slot-machine-case";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <Tabs defaultValue="randomizer">
      <TabsList>
        <TabsTrigger value="randomizer">Randomizer</TabsTrigger>
        <TabsTrigger value="slotMachine">Slot machine</TabsTrigger>
      </TabsList>

      <TabsContent value="randomizer">
        <RandomizerCase />
      </TabsContent>

      <TabsContent value="slotMachine">
        <SlotMachineCase />
      </TabsContent>
    </Tabs>
  );
}
