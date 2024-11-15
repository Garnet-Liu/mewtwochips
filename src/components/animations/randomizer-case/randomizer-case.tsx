"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Randomizer } from "@/components/animations/randomizer-case";

export function RandomizerCase() {
  const [showWheel, setShowWheel] = useState(false);

  const randomizer = [
    { name: "123", color: "gray" },
    { name: "123", color: "blue" },
    { name: "123", color: "black" },
    { name: "123", color: "orange" },
    { name: "123", color: "#3C2957" },
  ];

  const wheelFinishedHandle = useCallback(() => {
    setTimeout(() => {
      setShowWheel(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setShowWheel(true);
  }, []);

  return (
    <div className="flex justify-between">
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
    </div>
  );
}
