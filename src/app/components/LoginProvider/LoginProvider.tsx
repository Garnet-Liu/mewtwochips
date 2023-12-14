"use client";

import { ClientSafeProvider, getProviders, LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useEffect, useState } from "react";

import { LoginButton } from "./LoginButton/LoginButton";

export function LoginProvider() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    getProviders().then((provider) => {
      setProviders(provider);
    });
  }, []);

  const providerKeys = Object.keys(providers || {});
  return (
    <div className="flex flex-col">
      {providerKeys.map((key) => {
        const provider = providers?.[key];
        return provider ? <LoginButton key={key} provider={provider} /> : null;
      })}
    </div>
  );
}
