import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import cn from "classnames";
import SvgFanaticsFlag from "@/app/wheel/Svg/FanaticsFlag";

type Props = {
  enteredUsernames: string[];
  animationDuration?: number;
  onFinished?: () => void;
  winnerName: string;
}

export function SlotMachine(props: Props) {
  const slotMachineRef = useRef<HTMLDivElement>(null);
  const [startAnimate, setStartAnimate] = useState(false);
  const [finishAnimate, setFinishAnimate] = useState(false);
  const { enteredUsernames = [], animationDuration = 5000, onFinished, winnerName } = props;

  const styleVariable = useMemo(() => {
    return {
      translate: `-${1 / (enteredUsernames.length + 1) * 100}%`,
      winnerIndex: String(enteredUsernames.findIndex((u) => u === winnerName))
    };
  }, [enteredUsernames, winnerName]);

  useEffect(() => {
    slotMachineRef.current?.style.setProperty("--slot-machine-winner", (styleVariable.winnerIndex));
    slotMachineRef.current?.style.setProperty("--slot-machine-translate-y", styleVariable.translate);
    setStartAnimate(true);
  }, [styleVariable]);

  const containerStyle = { animationDelay: `${animationDuration}ms` };
  const boxStyle = {
    animationDuration: `${(enteredUsernames.length + 1) * 0.1}s, 1s`,
    animationDelay: `0s, ${animationDuration}ms`
  };

  const animationEndHandle = useCallback(() => {
    setFinishAnimate(true);
    onFinished?.();
  }, [onFinished]);

  return (
    <div className="w-96 rounded-lg bg-black/25 px-4 py-6 text-white flex flex-col gap-3">
      <p className="text-2xl text-center font-semibold">And the winner is....</p>

      <div
        className={cn("border-4 rounded-lg", finishAnimate ? "text-green-500 border-green-500" : "border-transparent")}>
        <div
          onAnimationEnd={animationEndHandle}
          style={containerStyle}
          className={cn("w-full h-12 rounded-lg bg-black font-semibold text-xl overflow-hidden animate-[slot-machine-border_1s_forwards]")}>
          <div style={boxStyle}
               ref={slotMachineRef}
               className={cn("mx-auto",
                 startAnimate && "animate-[slot-machine_1s_linear_infinite,slot-machine-num_1s_forwards]"
               )}>
            {enteredUsernames.map((username) => (
              <p className="text-center leading-[48px]" key={username}>{username}</p>
            ))}
            <p className="text-center leading-[48px]">{enteredUsernames[0]}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <SvgFanaticsFlag width={16} height={16} color="white"/>
        <p className="text-sm">powered by Fanatics Live</p>
      </div>
    </div>
  );
}

