"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";
import styles from "./randomizer.module.css";
import { Win } from "@/components/animations/randomizer-case";

interface IProps {
  winIndex: number;
  items: Array<{ name: string; color: string }>;
  onFinished?: () => void;
}

const TIME_TO_SPIN_WHEEL = 4000;

export function Randomizer(props: IProps) {
  const { items, winIndex, onFinished } = props;

  console.log("winIndex", winIndex);

  const wheelRef = useRef<HTMLDivElement>(null);

  const rotate = 360 / items.length;

  const rotateNumber = 360 * 3 + (360 - winIndex * rotate + 90 - rotate / 2);

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "none";
      const offsetTop = wheelRef.current.offsetTop;
      console.log("=========> offsetTop", offsetTop);
      wheelRef.current.style.transitionProperty = "all";
      wheelRef.current.style.transitionDuration = `${TIME_TO_SPIN_WHEEL}ms`;
      console.log("rotateNumber", rotateNumber);
      wheelRef.current.style.transform = `rotate(${rotateNumber}deg)`;
    }
  }, [rotateNumber]);

  const circleBottomCss = useCallback(
    (index: number) => {
      return { transform: `rotate(${rotate * index}deg)` };
    },
    [rotate],
  );

  const { top, text } = useMemo(() => {
    return {
      top: { transform: `rotate(${rotate}deg)` },
      text: { transform: `rotate(${-90 - rotate / 2}deg)` },
    };
  }, [rotate]);

  return (
    <div className="relative w-full pt-[100%]">
      <div className="absolute bottom-0 left-0 right-0 top-0">
        <div
          ref={wheelRef}
          onTransitionEnd={onFinished}
          className={cn("relative h-full w-full transition", styles.mask)}
        >
          {items.map((i, index) => {
            return (
              <div
                key={index}
                style={circleBottomCss(index)}
                className={cn(
                  "absolute left-[2%] top-[2%] h-[96%] w-[96%]",
                  styles["circle-bottom"],
                )}
              >
                <div
                  style={top}
                  className={cn(
                    "h-full w-full rounded-full text-center",
                    i.color,
                    styles["circle-top"],
                  )}
                >
                  <div style={text} className="flex h-full w-full items-center justify-center">
                    <span className="translate-x-1/2 pl-[50px] text-white">
                      {i.name} {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Win winIndex={winIndex} rotate={rotate} rotateNumber={rotateNumber} />
      </div>
    </div>
  );
}
