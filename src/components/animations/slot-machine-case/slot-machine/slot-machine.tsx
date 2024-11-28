"use client";

import { AnimationEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { FanaticsFlag } from "@/components/svgs";

type Props = {
  enteredUsernames: string[];
  animationDuration?: number;
  onFinished?: () => void;
  winnerName: string;
};

export function SlotMachine(props: Props) {
  const slotMachineRef = useRef<HTMLDivElement>(null);
  const [firstAnimate, setFirstAnimate] = useState(false);
  const [secondAnimate, setSecondAnimate] = useState(false);
  const [finishAnimate, setFinishAnimate] = useState(false);
  const { enteredUsernames = [], animationDuration = 5000, onFinished, winnerName } = props;

  const styleVariable = useMemo(() => {
    return {
      translate: `-${(1 / (enteredUsernames.length + 1)) * 100}%`,
      winnerIndex: String(enteredUsernames.findIndex((u) => u === winnerName)),
    };
  }, [enteredUsernames, winnerName]);

  const containerStyle = { animationDelay: `${animationDuration}ms` };
  const boxStyle = {
    animationDuration: `${(enteredUsernames.length + 1) * 0.1}s, 1s`,
    animationDelay: `0s, ${animationDuration}ms`,
  };

  const animationEndHandle = useCallback(
    (e: AnimationEvent<HTMLDivElement>) => {
      if (e.animationName === "slot-machine-border") {
        onFinished?.();
      } else if (e.animationName === "slot-machine-num") {
        setSecondAnimate(false);
        setFinishAnimate(true);
        setFirstAnimate(false);
      }
    },
    [onFinished],
  );

  const animationStartHandle = useCallback((e: AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === "slot-machine-num") {
      setSecondAnimate(true);
    }
  }, []);

  useEffect(() => {
    slotMachineRef.current?.style.setProperty("--slot-machine-winner", styleVariable.winnerIndex);
    slotMachineRef.current?.style.setProperty(
      "--slot-machine-translate-y",
      styleVariable.translate,
    );
    setFirstAnimate(true);
  }, [styleVariable]);

  return (
    <div className="flex w-96 flex-col gap-3 rounded-lg bg-foreground px-4 py-6 text-background">
      <p className="text-center text-2xl font-semibold">And the winner is....</p>

      <div
        className={cn(
          "rounded-lg border-4",
          finishAnimate ? "border-green-500 text-green-500" : "border-transparent",
        )}
      >
        <div
          onAnimationEnd={animationEndHandle}
          style={containerStyle}
          className={cn(
            "h-12 w-full animate-[slot-machine-border_1s_forwards] overflow-hidden rounded-lg bg-background/25 text-xl font-semibold",
          )}
        >
          <div
            style={boxStyle}
            ref={slotMachineRef}
            onAnimationStart={animationStartHandle}
            className={cn(
              "mx-auto",
              firstAnimate
                ? secondAnimate
                  ? "animate-[slot-machine-num_1s_forwards]"
                  : "animate-[slot-machine_1s_linear_infinite,slot-machine-num_1s_forwards]"
                : "",
            )}
          >
            {enteredUsernames.map((username) => (
              <p className="text-center leading-[48px]" key={username}>
                {username}
              </p>
            ))}
            <p className="text-center leading-[48px]">{enteredUsernames[0]}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <FanaticsFlag width={16} height={16} color="white" />
        <p className="text-sm">powered by Fanatics Live</p>
      </div>
    </div>
  );
}
