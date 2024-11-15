"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface IProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: IProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-width my-9 flex flex-col items-center justify-center gap-4">
      <h2 className="font-bold">Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
