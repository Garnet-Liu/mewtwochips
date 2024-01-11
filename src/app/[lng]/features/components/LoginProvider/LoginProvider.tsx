"use client";

import { useEffect, useState } from "react";

import { Button } from "@radix-ui/themes";
import { cookies } from "next/headers";

export function LoginProvider() {
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-4">
      <Button>Sign in</Button>
    </div>
  );
}
