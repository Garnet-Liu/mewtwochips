// lib/client.js
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { headers } from "next/headers";

import { env } from "../../../../env.mjs";
import { authLinkServer } from "@/context/apollo/authServerLink";

export const { getClient } = registerApolloClient(() => {
  const header = Object.fromEntries(headers());
  const links = from([
    authLinkServer,
    new HttpLink({
      headers: header,
      uri: `${env.NEXT_PUBLIC_API_BASE_URL}/api/graphql`,
    }),
  ]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: links,
  });
});
