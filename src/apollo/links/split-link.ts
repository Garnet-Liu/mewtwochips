import { getMainDefinition } from "@apollo/client/utilities";
import { split } from "@apollo/client";

import { wsLink } from "@/apollo/links/ws-link";
import { httpLink } from "@/apollo/links/http-link";

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink,
);
