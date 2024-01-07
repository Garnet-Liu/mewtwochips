"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AuthProvider = (props: Props) => {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
};
