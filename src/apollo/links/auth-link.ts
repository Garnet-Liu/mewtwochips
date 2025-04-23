import { setContext } from "@apollo/client/link/context";

export const authLink = setContext(async (_, { headers }) => {
  console.log(
    "=========> apollo authLink => window",
    typeof window === "undefined" ? "server" : "client",
  );

  console.log("_", _);
  console.log("headers", headers);

  return { headers: { ...headers } };
});
