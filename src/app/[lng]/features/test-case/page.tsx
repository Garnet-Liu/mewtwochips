import React from "react";

import { VirtualScrolling } from "@/app/[lng]/features/test-case/libs";

export default function Page() {
  return (
    <div className="flex h-full flex-col gap-4 p-12">
      {/*<RandomizerCase />*/}

      {/*<SlotMachineCase />*/}

      {/*<DropdownWithDialogCase />*/}

      <VirtualScrolling />
    </div>
  );
}
