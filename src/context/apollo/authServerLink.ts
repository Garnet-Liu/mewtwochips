import { setContext } from "@apollo/client/link/context";
import { headers } from "next/headers";

export const authLinkServer = setContext(async (_, { headers }) => {
  console.log("headers", headers);
  return {
    headers: {
      ...headers,
    },
  };
});
