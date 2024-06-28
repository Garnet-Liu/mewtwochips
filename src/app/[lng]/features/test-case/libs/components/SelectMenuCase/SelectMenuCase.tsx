"use client";

import { Button } from "@radix-ui/themes";
import { useRef } from "react";

export function SelectMenuCase() {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  return (
    <div className="flex">
      <Button className="relative">
        下拉
        <select className="absolute inset-0 opacity-0" ref={selectRef}>
          <option value="1">option 1</option>
          <option value="2">option 2</option>
          <option value="3">option 3</option>
          <option value="4">option 4</option>
        </select>
      </Button>
    </div>
  );
}
