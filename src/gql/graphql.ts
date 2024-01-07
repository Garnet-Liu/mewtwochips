/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export enum ERole {
  Admin = "admin",
  CoLeader = "coLeader",
  Leader = "leader",
  Member = "member",
  NotMember = "not_member",
}

export enum EVillageType {
  BuilderBase = "builderBase",
  ClanCapital = "clanCapital",
  Home = "home",
}

export enum EWarPreference {
  In = "in",
  Out = "out",
}

export type Mutation = {
  __typename?: "Mutation";
  addVillage?: Maybe<TTest>;
};

export type MutationAddVillageArgs = {
  tag: Scalars["String"]["input"];
};

export type Profile = {
  __typename?: "Profile";
  clans?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  village?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type Query = {
  __typename?: "Query";
  currentUser?: Maybe<TCurrentUser>;
  village?: Maybe<VillageQuery>;
};

export type QueryVillageArgs = {
  tag: Scalars["String"]["input"];
};

export type TAchievement = {
  __typename?: "TAchievement";
  completionInfo?: Maybe<Scalars["String"]["output"]>;
  info?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  stars?: Maybe<Scalars["Int"]["output"]>;
  target?: Maybe<Scalars["Int"]["output"]>;
  value?: Maybe<Scalars["Int"]["output"]>;
  village?: Maybe<EVillageType>;
};

export type TBuilderBaseLeague = {
  __typename?: "TBuilderBaseLeague";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type TClan = {
  __typename?: "TClan";
  badgeUrls?: Maybe<TIconUrls>;
  clanLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  tag?: Maybe<Scalars["String"]["output"]>;
};

export type TClanTracker = {
  __typename?: "TClanTracker";
  tag?: Maybe<Scalars["String"]["output"]>;
};

export type TClientError = {
  __typename?: "TClientError";
  detail?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  reason?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type TCurrentUser = {
  __typename?: "TCurrentUser";
  clanTracker?: Maybe<Array<Maybe<TClanTracker>>>;
  villageTracker?: Maybe<Array<Maybe<TVillageTracker>>>;
};

export type TElement = {
  __typename?: "TElement";
  id?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type TEquipment = {
  __typename?: "TEquipment";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<EVillageType>;
};

export type THero = {
  __typename?: "THero";
  equipment?: Maybe<Array<Maybe<TEquipment>>>;
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<Scalars["String"]["output"]>;
};

export type TIconUrls = {
  __typename?: "TIconUrls";
  medium?: Maybe<Scalars["String"]["output"]>;
  small?: Maybe<Scalars["String"]["output"]>;
  tiny?: Maybe<Scalars["String"]["output"]>;
};

export type TLabel = {
  __typename?: "TLabel";
  iconUrls?: Maybe<TIconUrls>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type TLeague = {
  __typename?: "TLeague";
  iconUrls?: Maybe<TIconUrls>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type TPlayerHouse = {
  __typename?: "TPlayerHouse";
  elements?: Maybe<Array<Maybe<TElement>>>;
};

export type TSpell = {
  __typename?: "TSpell";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<Scalars["String"]["output"]>;
};

export type TTest = {
  __typename?: "TTest";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type TTroop = {
  __typename?: "TTroop";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<EVillageType>;
};

/** 每个村庄的详细信息 */
export type TVillage = {
  __typename?: "TVillage";
  achievements?: Maybe<Array<Maybe<TAchievement>>>;
  attackWins?: Maybe<Scalars["Int"]["output"]>;
  bestBuilderBaseTrophies?: Maybe<Scalars["Int"]["output"]>;
  bestTrophies?: Maybe<Scalars["Int"]["output"]>;
  builderBaseLeague?: Maybe<TBuilderBaseLeague>;
  builderBaseTrophies?: Maybe<Scalars["Int"]["output"]>;
  builderHallLevel?: Maybe<Scalars["Int"]["output"]>;
  clan?: Maybe<TClan>;
  clanCapitalContributions?: Maybe<Scalars["Int"]["output"]>;
  defenseWins?: Maybe<Scalars["Int"]["output"]>;
  donations?: Maybe<Scalars["Int"]["output"]>;
  donationsReceived?: Maybe<Scalars["Int"]["output"]>;
  expLevel?: Maybe<Scalars["Int"]["output"]>;
  heroEquipment?: Maybe<Array<Maybe<TEquipment>>>;
  heroes?: Maybe<Array<Maybe<THero>>>;
  labels?: Maybe<Array<Maybe<TLabel>>>;
  league?: Maybe<TLeague>;
  name?: Maybe<Scalars["String"]["output"]>;
  playerHouse?: Maybe<TPlayerHouse>;
  role?: Maybe<ERole>;
  spells?: Maybe<Array<Maybe<TSpell>>>;
  tag?: Maybe<Scalars["String"]["output"]>;
  townHallLevel?: Maybe<Scalars["Int"]["output"]>;
  townHallWeaponLevel?: Maybe<Scalars["Int"]["output"]>;
  troops?: Maybe<Array<Maybe<TTroop>>>;
  trophies?: Maybe<Scalars["Int"]["output"]>;
  warPreference?: Maybe<EWarPreference>;
  warStars?: Maybe<Scalars["Int"]["output"]>;
};

export type TVillageTracker = {
  __typename?: "TVillageTracker";
  tag?: Maybe<Scalars["String"]["output"]>;
};

export type VillageQuery = TClientError | TVillage;

export type QueryCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type QueryCurrentUserQuery = {
  __typename?: "Query";
  currentUser?: { __typename: "TCurrentUser" } | null;
};

export type MutationAddVillageMutationVariables = Exact<{
  tag: Scalars["String"]["input"];
}>;

export type MutationAddVillageMutation = {
  __typename?: "Mutation";
  addVillage?: { __typename?: "TTest"; success?: boolean | null } | null;
};

export type QueryVillageQueryVariables = Exact<{
  tag: Scalars["String"]["input"];
}>;

export type QueryVillageQuery = {
  __typename?: "Query";
  village?:
    | { __typename: "TClientError"; reason?: string | null; message?: string | null }
    | {
        __typename: "TVillage";
        tag?: string | null;
        name?: string | null;
        clan?: {
          __typename?: "TClan";
          tag?: string | null;
          name?: string | null;
          badgeUrls?: { __typename?: "TIconUrls"; medium?: string | null } | null;
        } | null;
        league?: {
          __typename?: "TLeague";
          id?: string | null;
          name?: string | null;
          iconUrls?: { __typename?: "TIconUrls"; medium?: string | null } | null;
        } | null;
      }
    | null;
};

export const QueryCurrentUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "queryCurrentUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "currentUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "__typename" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryCurrentUserQuery, QueryCurrentUserQueryVariables>;
export const MutationAddVillageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "mutationAddVillage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "tag" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addVillage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "tag" },
                value: { kind: "Variable", name: { kind: "Name", value: "tag" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "success" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MutationAddVillageMutation, MutationAddVillageMutationVariables>;
export const QueryVillageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "queryVillage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "tag" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "village" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "tag" },
                value: { kind: "Variable", name: { kind: "Name", value: "tag" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "TClientError" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "reason" } },
                      { kind: "Field", name: { kind: "Name", value: "message" } },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TVillage" } },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "tag" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "clan" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "tag" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "badgeUrls" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "medium" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "league" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "iconUrls" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "medium" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryVillageQuery, QueryVillageQueryVariables>;
