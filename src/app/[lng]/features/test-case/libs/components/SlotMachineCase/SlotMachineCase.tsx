"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@radix-ui/themes";

import { SlotMachine } from "./SlotMachine/SlotMachine";

export function SlotMachineCase() {
  const [showSlotMachine, setShowSlotMachine] = useState(false);

  const slotMachine = useMemo(() => {
    return [
      "Garnet01",
      "Garnet02",
      // , "Garnet2", "Garnet3", "Garnet4", "Garnet5", "Garnet6", "Garnet7"
    ];
  }, []);

  useEffect(() => {
    setShowSlotMachine(true);
  }, []);

  const slotMachineFinishedHandle = useCallback(() => {
    setTimeout(() => {
      setShowSlotMachine(false);
    }, 2000);
  }, []);

  return (
    <div className="min-h-[450px] w-[400px]">
      <Button disabled={showSlotMachine} onClick={() => setShowSlotMachine(true)}>
        Start
      </Button>

      {showSlotMachine && (
        <SlotMachine
          winnerName="Garnet"
          animationDuration={2000}
          onFinished={slotMachineFinishedHandle}
          enteredUsernames={slotMachine}
        />
      )}
    </div>
  );
}
