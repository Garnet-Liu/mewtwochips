import { ApolloLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { headers } from "next/headers";

import { authLink } from "@/apollo/links/auth-link";
import { httpLink } from "@/apollo/links/http-link";

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultContext: { headers: Object.fromEntries((await headers()).entries()) },
    link: ApolloLink.from([authLink, httpLink]),
  });
});
