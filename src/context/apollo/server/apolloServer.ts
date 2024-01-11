// lib/client.js
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { from, HttpLink } from "@apollo/client";
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

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: links,
  });
});
