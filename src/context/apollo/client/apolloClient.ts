import { ApolloLink, HttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { env } from "../../../../env.mjs";

export const makeClient = () => {
  const httpLink = new HttpLink({
    uri: `${env.NEXT_PUBLIC_API_BASE_URL}/api/graphql`,
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])
        : httpLink,
  });
};
