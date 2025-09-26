"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import type { ReactNode } from "react";

import { makeClient } from "@/apollo/client";

interface IProps {
  children: ReactNode;
}

export function ApolloProvider({ children }: Readonly<IProps>) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
