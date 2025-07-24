import { mergeResolvers } from "@graphql-tools/merge";

import { pokemonResolver } from "./resolvers/pokemon.resolver";

import { Resolvers } from "@/graphql/generated-resolvers";

export const resolvers: Resolvers = mergeResolvers([pokemonResolver]);
