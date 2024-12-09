import { setContext } from "@apollo/client/link/context";

export const authLink = setContext((_, { headers }) => {
  console.log(
    "=========> apollo authLink => window",
    typeof window === "undefined" ? "server" : "client",
  );

  return { headers: { ...headers } };
});
