"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@radix-ui/themes";

import { Randomizer } from "@/app/[lng]/features/wheel/components/Randomizer/Randomizer";
import { SlotMachine } from "@/app/[lng]/features/wheel/components/SlotMachine/SlotMachine";

export default function Page() {
  const [showWheel, setShowWheel] = useState(false);
  const [showSlotMachine, setShowSlotMachine] = useState(false);

  const randomizer = [
    { name: "123", color: "gray" },
    { name: "123", color: "blue" },
    { name: "123", color: "black" },
    { name: "123", color: "orange" },
    { name: "123", color: "#3C2957" },
  ];

  const slotMachine = useMemo(() => {
    return [
      "Garnet01",
      "Garnet02",
      // , "Garnet2", "Garnet3", "Garnet4", "Garnet5", "Garnet6", "Garnet7"
    ];
  }, []);

  useEffect(() => {
    setShowWheel(true);
    setShowSlotMachine(true);
  }, []);

  const wheelFinishedHandle = useCallback(() => {
    setTimeout(() => {
      setShowWheel(false);
    }, 2000);
  }, []);

  const slotMachineFinishedHandle = useCallback(() => {
    setTimeout(() => {
      setShowSlotMachine(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-12">
      <div className="min-h-[450px] w-[400px]">
        <Button disabled={showWheel} onClick={() => setShowWheel(true)}>
          Start
        </Button>

        {showWheel && (
          <Randomizer items={randomizer} winIndex={4} onFinished={wheelFinishedHandle} />
        )}
      </div>

      <div className="min-h-[450px] w-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="white" stroke="black" strokeWidth="10" />
        </svg>
      </div>

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
    </div>
  );
}
