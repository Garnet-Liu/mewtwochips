"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

interface Props {
  children: ReactNode;
}

export const AuthProvider = (props: Props) => {
  const { children } = props;
  return (
    <SessionProvider>
      <SyncFirebaseAuth>{children}</SyncFirebaseAuth>
    </SessionProvider>
  );
};

const SyncFirebaseAuth = (props: Props) => {
  const { children } = props;

  useFirebaseAuth();

  return <>{children}</>;
};
