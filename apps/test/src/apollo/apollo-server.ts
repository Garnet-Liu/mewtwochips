import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/experimental-nextjs-app-support";
import { from } from "@apollo/client";

import { httpLink } from "@/apollo/links/http-link";
import { authLink } from "@/apollo/links/auth-link";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, httpLink]),
  });
});
