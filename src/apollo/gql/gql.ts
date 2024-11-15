/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  "\n  fragment FPokemonAbilities on PokemonAbilities {\n    __typename\n    id\n    name\n    name_id\n    entries\n    is_hidden\n  }\n":
    types.FPokemonAbilitiesFragmentDoc,
  "\n  fragment FPokemonStats on PokemonStats {\n    __typename\n    id\n    name\n    name_id\n    base_stat\n  }\n":
    types.FPokemonStatsFragmentDoc,
  "\n  fragment FPokemon on Pokemon {\n    __typename\n    id\n    name\n    name_id\n    order\n    genera\n    color\n    flavor_text\n    images {\n      front_default\n      front_shiny\n      back_default\n      back_shiny\n      official_default\n      official_shiny\n    }\n    abilities {\n      ...FPokemonAbilities\n    }\n  }\n":
    types.FPokemonFragmentDoc,
  "\n  mutation MAddBook($title: String!, $author: String!) {\n    addBook(title: $title, author: $author) {\n      id\n      title\n      author\n    }\n  }\n":
    types.MAddBookDocument,
  "\n  query QAllPokemon($offset: Int!, $limit: Int!) {\n    pokemonAll(offset: $offset, limit: $limit) {\n      __typename\n      count\n      limit\n      offset\n      results {\n        ...FPokemon\n      }\n    }\n  }\n":
    types.QAllPokemonDocument,
  "\n  query QBook($id: String!) {\n    book(id: $id) {\n      id\n      title\n      author\n    }\n  }\n":
    types.QBookDocument,
  "\n  query QBooks {\n    books {\n      id\n      title\n      author\n    }\n  }\n":
    types.QBooksDocument,
  "\n  query QPokemon($id: ID, $name: String) {\n    pokemon(id: $id, name: $name) {\n      ...FPokemon\n      stats {\n        ...FPokemonStats\n      }\n    }\n  }\n":
    types.QPokemonDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment FPokemonAbilities on PokemonAbilities {\n    __typename\n    id\n    name\n    name_id\n    entries\n    is_hidden\n  }\n",
): (typeof documents)["\n  fragment FPokemonAbilities on PokemonAbilities {\n    __typename\n    id\n    name\n    name_id\n    entries\n    is_hidden\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment FPokemonStats on PokemonStats {\n    __typename\n    id\n    name\n    name_id\n    base_stat\n  }\n",
): (typeof documents)["\n  fragment FPokemonStats on PokemonStats {\n    __typename\n    id\n    name\n    name_id\n    base_stat\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment FPokemon on Pokemon {\n    __typename\n    id\n    name\n    name_id\n    order\n    genera\n    color\n    flavor_text\n    images {\n      front_default\n      front_shiny\n      back_default\n      back_shiny\n      official_default\n      official_shiny\n    }\n    abilities {\n      ...FPokemonAbilities\n    }\n  }\n",
): (typeof documents)["\n  fragment FPokemon on Pokemon {\n    __typename\n    id\n    name\n    name_id\n    order\n    genera\n    color\n    flavor_text\n    images {\n      front_default\n      front_shiny\n      back_default\n      back_shiny\n      official_default\n      official_shiny\n    }\n    abilities {\n      ...FPokemonAbilities\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation MAddBook($title: String!, $author: String!) {\n    addBook(title: $title, author: $author) {\n      id\n      title\n      author\n    }\n  }\n",
): (typeof documents)["\n  mutation MAddBook($title: String!, $author: String!) {\n    addBook(title: $title, author: $author) {\n      id\n      title\n      author\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query QAllPokemon($offset: Int!, $limit: Int!) {\n    pokemonAll(offset: $offset, limit: $limit) {\n      __typename\n      count\n      limit\n      offset\n      results {\n        ...FPokemon\n      }\n    }\n  }\n",
): (typeof documents)["\n  query QAllPokemon($offset: Int!, $limit: Int!) {\n    pokemonAll(offset: $offset, limit: $limit) {\n      __typename\n      count\n      limit\n      offset\n      results {\n        ...FPokemon\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query QBook($id: String!) {\n    book(id: $id) {\n      id\n      title\n      author\n    }\n  }\n",
): (typeof documents)["\n  query QBook($id: String!) {\n    book(id: $id) {\n      id\n      title\n      author\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query QBooks {\n    books {\n      id\n      title\n      author\n    }\n  }\n",
): (typeof documents)["\n  query QBooks {\n    books {\n      id\n      title\n      author\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query QPokemon($id: ID, $name: String) {\n    pokemon(id: $id, name: $name) {\n      ...FPokemon\n      stats {\n        ...FPokemonStats\n      }\n    }\n  }\n",
): (typeof documents)["\n  query QPokemon($id: ID, $name: String) {\n    pokemon(id: $id, name: $name) {\n      ...FPokemon\n      stats {\n        ...FPokemonStats\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
