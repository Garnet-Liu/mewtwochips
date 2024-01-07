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
 */
const documents = {
  "\n  query queryCurrentUser {\n    currentUser {\n      __typename\n    }\n  }\n":
    types.QueryCurrentUserDocument,
  "\n  mutation mutationAddVillage($tag: String!) {\n    addVillage(tag: $tag) {\n      success\n    }\n  }\n":
    types.MutationAddVillageDocument,
  "\n  query queryVillage($tag: String!) {\n    village(tag: $tag) {\n      __typename\n      ... on TClientError {\n        reason\n        message\n      }\n      ... on TVillage {\n        tag\n        name\n        clan {\n          tag\n          name\n          badgeUrls {\n            medium\n          }\n        }\n        league {\n          id\n          name\n          iconUrls {\n            medium\n          }\n        }\n      }\n    }\n  }\n":
    types.QueryVillageDocument,
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
  source: "\n  query queryCurrentUser {\n    currentUser {\n      __typename\n    }\n  }\n",
): (typeof documents)["\n  query queryCurrentUser {\n    currentUser {\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation mutationAddVillage($tag: String!) {\n    addVillage(tag: $tag) {\n      success\n    }\n  }\n",
): (typeof documents)["\n  mutation mutationAddVillage($tag: String!) {\n    addVillage(tag: $tag) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query queryVillage($tag: String!) {\n    village(tag: $tag) {\n      __typename\n      ... on TClientError {\n        reason\n        message\n      }\n      ... on TVillage {\n        tag\n        name\n        clan {\n          tag\n          name\n          badgeUrls {\n            medium\n          }\n        }\n        league {\n          id\n          name\n          iconUrls {\n            medium\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query queryVillage($tag: String!) {\n    village(tag: $tag) {\n      __typename\n      ... on TClientError {\n        reason\n        message\n      }\n      ... on TVillage {\n        tag\n        name\n        clan {\n          tag\n          name\n          badgeUrls {\n            medium\n          }\n        }\n        league {\n          id\n          name\n          iconUrls {\n            medium\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
