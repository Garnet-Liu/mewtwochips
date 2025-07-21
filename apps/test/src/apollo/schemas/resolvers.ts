import { mergeResolvers } from "@graphql-tools/merge";

import { bookResolver } from "./resolvers/book.resolver";
import { pokemonResolver } from "./resolvers/pokemon.resolver";

export const resolvers = mergeResolvers([bookResolver, pokemonResolver]);
