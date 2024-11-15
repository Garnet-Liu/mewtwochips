"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { SlotMachine } from "@/components/animations/slot-machine-case";

export function SlotMachineCase() {
  const [showSlotMachine, setShowSlotMachine] = useState(false);

  const slotMachine = useMemo(() => {
    return ["Garnet01", "Garnet02", "Garnet03", "Garnet04", "Garnet05", "Garnet06", "Garnet07"];
  }, []);

  useEffect(() => {
    setShowSlotMachine(true);
  }, []);

  const slotMachineFinishedHandle = useCallback(() => {
    console.log("slotMachineFinishedHandle start");
    setTimeout(() => {
      console.log("slotMachineFinishedHandle end");
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
          winnerName="Garnet01"
          animationDuration={2000}
          onFinished={slotMachineFinishedHandle}
          enteredUsernames={slotMachine}
        />
      )}
    </div>
  );
}
