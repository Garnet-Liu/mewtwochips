import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/experimental-nextjs-app-support";

import { httpLink } from "@/apollo/links/http-link";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
});
