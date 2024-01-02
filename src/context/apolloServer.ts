// lib/client.js
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { HttpLink } from "@apollo/client";

import { env } from "../../env.mjs";

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: `${env.NEXT_PUBLIC_API_BASE_URL}/api/graphql`,
    }),
  });
});
