import { ComboboxBadge } from "@/components/react-form/combobox-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiscriminatedUnionForm } from "@/components/react-form/discriminated-union-form";

export default function Page() {
  return (
    <Tabs defaultValue="discriminated" className="">
      <TabsList>
        <TabsTrigger value="discriminated">Discriminated union</TabsTrigger>
        <TabsTrigger value="combobox">Combobox Badge</TabsTrigger>
      </TabsList>

      <TabsContent value="discriminated">
        <DiscriminatedUnionForm />
      </TabsContent>

      <TabsContent value="combobox">
        <ComboboxBadge />
      </TabsContent>
    </Tabs>
  );
}
