"use client";

import { useEffect, useRef } from "react";

import "./Randomizer.css";

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
      wheelRef.current.offsetTop;
      wheelRef.current.style.transitionProperty = "all";
      wheelRef.current.style.transitionDuration = `${TIME_TO_SPIN_WHEEL}ms`;
      console.log("rotateNumber", rotateNumber);
      wheelRef.current.style.transform = `rotate(${rotateNumber}deg)`;
    }
  }, [rotateNumber]);

  const circleBottomCss = (index: number) => {
    return {
      transform: `rotate(${rotate * index}deg)`,
    };
  };

  const circleTopCss = (index: number, color?: string) => {
    return {
      transform: `rotate(${rotate}deg)`,
      background: color || items[index].color,
    };
  };

  const textCss = () => {
    return {
      transform: `rotate(${-90 - rotate / 2}deg)`,
    };
  };

  // 圆心坐标
  const cx = 200;
  const cy = 200;

  // 圆的半径
  const r = 192;

  const start = -90;
  const end = 90;

  console.log("大小", end - start);

  // 起始角度和结束角度（以弧度表示）
  const startAngle = (start * Math.PI) / 180; // 起始角度为30度，转换为弧度
  const endAngle = (end * Math.PI) / 180; // 结束角度为120度，转换为弧度

  // 计算起点坐标
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);

  // 计算终点坐标
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);

  // 输出起点和终点坐标
  console.log("起点坐标:", x1, y1);
  console.log("终点坐标:", x2, y2);

  return (
    <div className="relative w-full pt-[100%]">
      <div
        ref={wheelRef}
        className="absolute bottom-0 left-0 right-0 top-0 transition"
        onTransitionEnd={onFinished}
      >
        <div className="mask relative h-full w-full">
          {items.map((i, index) => {
            return (
              <div
                key={index}
                style={circleBottomCss(index)}
                className="circle-bottom absolute left-[2%] top-[2%] h-[96%] w-[96%]"
              >
                <div
                  style={circleTopCss(index)}
                  className="circle-top h-full w-full rounded-full text-center"
                >
                  <div style={textCss()} className="flex h-full w-full items-center justify-center">
                    <span className="translate-x-1/2 pl-[110px] text-white">
                      {i.name} {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0 h-full w-full"
            width="400"
            height="400"
            viewBox="0 0 400 400"
          >
            <path
              d={`M200,200 L${x1},${y1} A${r},${r} 0 ${
                end - start > 180 ? "1" : "0"
              } 1 ${x2},${y2} Z`}
              fill="transparent"
              stroke="red"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
