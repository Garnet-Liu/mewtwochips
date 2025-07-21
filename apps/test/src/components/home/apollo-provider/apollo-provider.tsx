"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import { ReactNode } from "react";

import { makeClient } from "@/apollo/apollo-client";

interface IProps {
  children: ReactNode;
}

export function ApolloProvider({ children }: Readonly<IProps>) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
