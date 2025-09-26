import { ApolloLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";

import { authLink } from "@/apollo/links/auth-link";
import { httpLink } from "@/apollo/links/http-link";
import { multipartLink } from "@/apollo/links/SSR-multipart-link";

// have a function to create a client for you
export const makeClient = () => {
  let links: ApolloLink;

  if (typeof window === "undefined") {
    links = ApolloLink.from([multipartLink, authLink, httpLink]);
  } else {
    links = ApolloLink.from([authLink, httpLink]);
  }

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: links,
  });
};
