"use client";

import { Randomizer } from "@/app/wheel/Randomizer/Randomizer";
import { useEffect, useState } from "react";

export default function WheelPage() {

  const [show, setShow]= useState(false)

  const items1 = [
    { name: "123", color: "red" },
    { name: "123", color: "blue" },
    { name: "123", color: "black" },
    { name: "123", color: "orange" },
    { name: "123", color: "#3C2957" },
    { name: "123", color: "red" },
    { name: "123", color: "blue" },
    { name: "123", color: "black" },
    { name: "123", color: "orange" },
    { name: "123", color: "#3C2957" },
    { name: "123", color: "red" },
    { name: "123", color: "blue" },
    { name: "123", color: "black" },
    { name: "123", color: "orange" },
    { name: "123", color: "#3C2957" }
  ];
  const items2 = [
    { name: "123", color: "gray" },
    { name: "123", color: "blue" },
    { name: "123", color: "black" },
    { name: "123", color: "orange" },
    { name: "123", color: "#3C2957" },
  ];


  useEffect(() => {
    setShow(true)
  }, []);
  return (
    <div className="p-12 flex gap-4 flex-wrap">
      <div className="w-[400px] h-[400px]">
        <Randomizer items={items1} winIndex={1}/>
      </div>
      <div className="w-[400px] h-[400px]">
        {show && <Randomizer items={items2} winIndex={4}/>}
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="white" stroke="black" strokeWidth="10"/>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
        <path d="M 200 200 L200,8 A200,200 0 1,1 200 200 z" stroke="red" strokeWidth="3" fill="transparent" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg"
           width="400"
           height="400" viewBox="0 0 400 400">
        <path d="M 0 196 A 196 196 0 1 1 392 196 z" stroke="red" strokeWidth="3" fill="transparent" />
      </svg>
    </div>
  );
}
