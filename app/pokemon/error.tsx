"use client";

import { Button } from "@mui/material";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void; }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-[1200px] mx-auto flex flex-col justify-center my-9">
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
