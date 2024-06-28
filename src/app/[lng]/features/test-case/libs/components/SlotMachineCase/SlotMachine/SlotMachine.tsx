"use client";

import { AnimationEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/context/cn";
import { FanaticsFlag } from "@/components/Svgs";

type Props = {
  enteredUsernames: string[];
  animationDuration?: number;
  onFinished?: () => void;
  winnerName: string;
};

export function SlotMachine(props: Props) {
  const slotMachineRef = useRef<HTMLDivElement>(null);
  const [startAnimate, setStartAnimate] = useState(false);
  const [secondAnimate, setSecondAnimate] = useState(false);
  const [finishAnimate, setFinishAnimate] = useState(false);
  const { enteredUsernames = [], animationDuration = 5000, onFinished, winnerName } = props;

  const styleVariable = useMemo(() => {
    return {
      translate: `-${(1 / (enteredUsernames.length + 1)) * 100}%`,
      winnerIndex: String(enteredUsernames.findIndex((u) => u === winnerName)),
    };
  }, [enteredUsernames, winnerName]);

  useEffect(() => {
    slotMachineRef.current?.style.setProperty("--slot-machine-winner", styleVariable.winnerIndex);
    slotMachineRef.current?.style.setProperty(
      "--slot-machine-translate-y",
      styleVariable.translate,
    );
    setStartAnimate(true);
  }, [styleVariable]);

  const containerStyle = { animationDelay: `${animationDuration}ms` };
  const boxStyle = {
    animationDuration: `${(enteredUsernames.length + 1) * 0.1}s, 1s`,
    animationDelay: `0s, ${animationDuration}ms`,
  };

  const animationEndHandle = useCallback(
    (e: AnimationEvent<HTMLDivElement>) => {
      console.log("animationEndHandle useCallback", e.animationName);
      setFinishAnimate(true);
      setStartAnimate(false);
      setSecondAnimate(false);
      onFinished?.();
    },
    [onFinished],
  );

  const animationStartHandle = useCallback((e: AnimationEvent<HTMLDivElement>) => {
    console.log("animationStartHandle useCallback", e.animationName);
    if (e.animationName === "slot-machine-num") {
      setSecondAnimate(true);
    }
  }, []);

  return (
    <div className="flex w-96 flex-col gap-3 rounded-lg bg-black/25 px-4 py-6 text-white">
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
            "h-12 w-full animate-[slot-machine-border_1s_forwards] overflow-hidden rounded-lg bg-black text-xl font-semibold",
          )}
        >
          <div
            style={boxStyle}
            ref={slotMachineRef}
            onAnimationStart={animationStartHandle}
            className={cn(
              "mx-auto",
              startAnimate
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
