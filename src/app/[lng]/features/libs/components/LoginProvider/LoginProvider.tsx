"use client";

import { useEffect } from "react";
import { Button } from "@radix-ui/themes";

export function LoginProvider() {
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-4">
      <Button>Sign in</Button>
    </div>
  );
}
