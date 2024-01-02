"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { ReactNode } from "react";

import { makeClient } from "@/context/apolloClient";

interface Props {
  children: ReactNode;
}

export function ApolloProvider(props: Props) {
  const { children } = props;
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
