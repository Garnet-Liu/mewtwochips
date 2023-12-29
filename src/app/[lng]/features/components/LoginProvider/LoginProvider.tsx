"use client";

import { LiteralUnion } from "next-auth/react";
import { useEffect, useState } from "react";

import { LoginButton } from "./LoginButton/LoginButton";
import { baseFetchRequest } from "@/context/apiFetchRequest";
import { BuiltInProviderType, CommonProviderOptions } from "@auth/core/providers";

export function LoginProvider() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    CommonProviderOptions
  > | null>(null);

  useEffect(() => {
    baseFetchRequest<Record<string, CommonProviderOptions>>("/api/auth/providers").then((res) => {
      console.log("res", res);
      setProviders(res);
    });
  }, []);

  const providerKeys = Object.keys(providers || {});
  return (
    <div className="flex flex-col gap-4">
      {providerKeys.map((key) => {
        const provider = providers?.[key];
        return provider ? <LoginButton key={key} provider={provider} /> : null;
      })}
    </div>
  );
}
