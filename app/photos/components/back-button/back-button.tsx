"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { Button } from "@/app/components/jump-route-button/junmp-route-button";

export default function BackButton({ children }: { children?: ReactNode }) {
  const router = useRouter();

  const handleBack = () => {
    console.log("handleBack");
    router.back();
  };
  return (
    <Button onClick={handleBack}>{children}</Button>
  );
}
