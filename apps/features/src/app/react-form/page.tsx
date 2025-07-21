import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

import { ComboboxBadge } from "@/components/react-form/combobox-badge";
import { DiscriminatedUnionForm } from "@/components/react-form/discriminated-union-form";

export default function ReactFormPage() {
  return (
    <Tabs defaultValue="discriminated" className="mx-auto w-90">
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
