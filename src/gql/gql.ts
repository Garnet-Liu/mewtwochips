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
  "\n  query queryCurrentUser {\n    currentUser {\n      villageTracker {\n        tag\n        name\n        expLevel\n        trophies\n        bestTrophies\n        donations\n        donationsReceived\n        builderHallLevel\n        builderBaseTrophies\n        bestBuilderBaseTrophies\n        warStars\n        clanCapitalContributions\n        league {\n          id\n          name\n          iconUrls {\n            medium\n            small\n            tiny\n          }\n        }\n        builderBaseLeague {\n          id\n          name\n        }\n        clan {\n          tag\n          clanLevel\n          name\n          badgeUrls {\n            medium\n            small\n            tiny\n          }\n        }\n        role\n        warPreference\n        attackWins\n        defenseWins\n        townHallLevel\n        townHallWeaponLevel\n        troops {\n          level\n          maxLevel\n          name\n          village\n        }\n        heroes {\n          level\n          maxLevel\n          name\n          village\n          equipment {\n            level\n            maxLevel\n            name\n            village\n          }\n        }\n        heroEquipment {\n          level\n          maxLevel\n          name\n          village\n        }\n        spells {\n          level\n          maxLevel\n          name\n          village\n        }\n        labels {\n          iconUrls {\n            medium\n            small\n            tiny\n          }\n          id\n          name\n        }\n        achievements {\n          completionInfo\n          info\n          name\n          stars\n          target\n          value\n          village\n        }\n        playerHouse {\n          elements {\n            id\n            type\n          }\n        }\n      }\n    }\n  }\n":
    types.QueryCurrentUserDocument,
  "\n  mutation mutationAddVillage($tag: String!) {\n    addVillage(tag: $tag) {\n      villageTracker {\n        tag\n      }\n    }\n  }\n":
    types.MutationAddVillageDocument,
  "\n  query querySearchVillage($tag: String!) {\n    village(tag: $tag) {\n      __typename\n      ... on ClientError {\n        reason\n        message\n      }\n      ... on Village {\n        tag\n        name\n        clan {\n          tag\n          name\n          badgeUrls {\n            medium\n          }\n        }\n        league {\n          id\n          name\n          iconUrls {\n            medium\n          }\n        }\n      }\n    }\n  }\n":
    types.QuerySearchVillageDocument,
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
  source: "\n  query queryCurrentUser {\n    currentUser {\n      villageTracker {\n        tag\n        name\n        expLevel\n        trophies\n        bestTrophies\n        donations\n        donationsReceived\n        builderHallLevel\n        builderBaseTrophies\n        bestBuilderBaseTrophies\n        warStars\n        clanCapitalContributions\n        league {\n          id\n          name\n          iconUrls {\n            medium\n            small\n            tiny\n          }\n        }\n        builderBaseLeague {\n          id\n          name\n        }\n        clan {\n          tag\n          clanLevel\n          name\n          badgeUrls {\n            medium\n            small\n            tiny\n          }\n        }\n        role\n        warPreference\n        attackWins\n        defenseWins\n        townHallLevel\n        townHallWeaponLevel\n        troops {\n          level\n          maxLevel\n          name\n          village\n        }\n        heroes {\n          level\n          maxLevel\n          name\n          village\n          equipment {\n            level\n            maxLevel\n            name\n            village\n          }\n        }\n        heroEquipment {\n          level\n          maxLevel\n          name\n          village\n        }\n        spells {\n          level\n          maxLevel\n          name\n          village\n        }\n        labels {\n          iconUrls {\n            medium\n            small\n            tiny\n          }\n          id\n          name\n        }\n        achievements {\n          completionInfo\n          info\n          name\n          stars\n          target\n          value\n          village\n        }\n        playerHouse {\n          elements {\n            id\n            type\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query queryCurrentUser {\n    currentUser {\n      villageTracker {\n        tag\n        name\n        expLevel\n        trophies\n        bestTrophies\n        donations\n        donationsReceived\n        builderHallLevel\n        builderBaseTrophies\n        bestBuilderBaseTrophies\n        warStars\n        clanCapitalContributions\n        league {\n          id\n          name\n          iconUrls {\n            medium\n            small\n            tiny\n          }\n        }\n        builderBaseLeague {\n          id\n          name\n        }\n        clan {\n          tag\n          clanLevel\n          name\n          badgeUrls {\n            medium\n            small\n            tiny\n          }\n        }\n        role\n        warPreference\n        attackWins\n        defenseWins\n        townHallLevel\n        townHallWeaponLevel\n        troops {\n          level\n          maxLevel\n          name\n          village\n        }\n        heroes {\n          level\n          maxLevel\n          name\n          village\n          equipment {\n            level\n            maxLevel\n            name\n            village\n          }\n        }\n        heroEquipment {\n          level\n          maxLevel\n          name\n          village\n        }\n        spells {\n          level\n          maxLevel\n          name\n          village\n        }\n        labels {\n          iconUrls {\n            medium\n            small\n            tiny\n          }\n          id\n          name\n        }\n        achievements {\n          completionInfo\n          info\n          name\n          stars\n          target\n          value\n          village\n        }\n        playerHouse {\n          elements {\n            id\n            type\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation mutationAddVillage($tag: String!) {\n    addVillage(tag: $tag) {\n      villageTracker {\n        tag\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation mutationAddVillage($tag: String!) {\n    addVillage(tag: $tag) {\n      villageTracker {\n        tag\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query querySearchVillage($tag: String!) {\n    village(tag: $tag) {\n      __typename\n      ... on ClientError {\n        reason\n        message\n      }\n      ... on Village {\n        tag\n        name\n        clan {\n          tag\n          name\n          badgeUrls {\n            medium\n          }\n        }\n        league {\n          id\n          name\n          iconUrls {\n            medium\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query querySearchVillage($tag: String!) {\n    village(tag: $tag) {\n      __typename\n      ... on ClientError {\n        reason\n        message\n      }\n      ... on Village {\n        tag\n        name\n        clan {\n          tag\n          name\n          badgeUrls {\n            medium\n          }\n        }\n        league {\n          id\n          name\n          iconUrls {\n            medium\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
