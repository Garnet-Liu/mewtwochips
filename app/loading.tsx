"use client";

import LoopIcon from "@mui/icons-material/Loop";

export default function Loading() {
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex justify-center items-center">
      <LoopIcon/>
    </div>
  );
}
