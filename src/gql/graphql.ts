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

export type Achievement = {
  __typename?: "Achievement";
  completionInfo?: Maybe<Scalars["String"]["output"]>;
  info?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  stars?: Maybe<Scalars["Int"]["output"]>;
  target?: Maybe<Scalars["Int"]["output"]>;
  value?: Maybe<Scalars["Int"]["output"]>;
  village?: Maybe<EVillageType>;
};

export type Army = {
  __typename?: "Army";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<EVillageType>;
};

export type Builder = {
  __typename?: "Builder";
  endAt?: Maybe<Scalars["String"]["output"]>;
  level?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  startAt?: Maybe<Scalars["String"]["output"]>;
};

/** 建筑大师的联赛等级 */
export type BuilderBaseLeague = {
  __typename?: "BuilderBaseLeague";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Clan = {
  __typename?: "Clan";
  badgeUrls?: Maybe<IconUrls>;
  clanLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  tag?: Maybe<Scalars["String"]["output"]>;
};

export type ClanTracker = {
  __typename?: "ClanTracker";
  tag?: Maybe<Scalars["String"]["output"]>;
};

export type ClientError = {
  __typename?: "ClientError";
  detail?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  reason?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type CurrentUser = {
  __typename?: "CurrentUser";
  clanTracker?: Maybe<Array<Maybe<ClanTracker>>>;
  villageTracker?: Maybe<Array<Maybe<VillageTracker>>>;
};

export type Defences = {
  __typename?: "Defences";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<EVillageType>;
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

export type Element = {
  __typename?: "Element";
  id?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type Equipment = {
  __typename?: "Equipment";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<EVillageType>;
};

export type Hero = {
  __typename?: "Hero";
  equipment?: Maybe<Array<Maybe<Equipment>>>;
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<Scalars["String"]["output"]>;
};

export type IVillage = {
  achievements?: Maybe<Array<Maybe<Achievement>>>;
  attackWins?: Maybe<Scalars["Int"]["output"]>;
  bestBuilderBaseTrophies?: Maybe<Scalars["Int"]["output"]>;
  bestTrophies?: Maybe<Scalars["Int"]["output"]>;
  builderBaseLeague?: Maybe<BuilderBaseLeague>;
  builderBaseTrophies?: Maybe<Scalars["Int"]["output"]>;
  builderHallLevel?: Maybe<Scalars["Int"]["output"]>;
  clan?: Maybe<Clan>;
  clanCapitalContributions?: Maybe<Scalars["Int"]["output"]>;
  defenseWins?: Maybe<Scalars["Int"]["output"]>;
  donations?: Maybe<Scalars["Int"]["output"]>;
  donationsReceived?: Maybe<Scalars["Int"]["output"]>;
  expLevel?: Maybe<Scalars["Int"]["output"]>;
  heroEquipment?: Maybe<Array<Maybe<Equipment>>>;
  heroes?: Maybe<Array<Maybe<Hero>>>;
  labels?: Maybe<Array<Maybe<Label>>>;
  league?: Maybe<League>;
  name?: Maybe<Scalars["String"]["output"]>;
  playerHouse?: Maybe<PlayerHouse>;
  role?: Maybe<ERole>;
  spells?: Maybe<Array<Maybe<Spell>>>;
  tag?: Maybe<Scalars["String"]["output"]>;
  townHallLevel?: Maybe<Scalars["Int"]["output"]>;
  townHallWeaponLevel?: Maybe<Scalars["Int"]["output"]>;
  troops?: Maybe<Array<Maybe<Troop>>>;
  trophies?: Maybe<Scalars["Int"]["output"]>;
  warPreference?: Maybe<EWarPreference>;
  warStars?: Maybe<Scalars["Int"]["output"]>;
};

export type IconUrls = {
  __typename?: "IconUrls";
  medium?: Maybe<Scalars["String"]["output"]>;
  small?: Maybe<Scalars["String"]["output"]>;
  tiny?: Maybe<Scalars["String"]["output"]>;
};

export type Label = {
  __typename?: "Label";
  iconUrls?: Maybe<IconUrls>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

/** 家乡的联赛的等级 */
export type League = {
  __typename?: "League";
  iconUrls?: Maybe<IconUrls>;
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addVillage?: Maybe<CurrentUser>;
};

export type MutationAddVillageArgs = {
  tag: Scalars["String"]["input"];
};

export type PlayerHouse = {
  __typename?: "PlayerHouse";
  elements?: Maybe<Array<Maybe<Element>>>;
};

export type Profile = {
  __typename?: "Profile";
  clans?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  village?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export type Query = {
  __typename?: "Query";
  currentUser?: Maybe<CurrentUser>;
  village?: Maybe<VillageQuery>;
};

export type QueryVillageArgs = {
  tag: Scalars["String"]["input"];
};

export type Resource = {
  __typename?: "Resource";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<EVillageType>;
};

export type Spell = {
  __typename?: "Spell";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<Scalars["String"]["output"]>;
};

export type Traps = {
  __typename?: "Traps";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<EVillageType>;
};

export type Troop = {
  __typename?: "Troop";
  level?: Maybe<Scalars["Int"]["output"]>;
  maxLevel?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  village?: Maybe<EVillageType>;
};

/** 每个村庄的详细信息 */
export type Village = IVillage & {
  __typename?: "Village";
  achievements?: Maybe<Array<Maybe<Achievement>>>;
  attackWins?: Maybe<Scalars["Int"]["output"]>;
  bestBuilderBaseTrophies?: Maybe<Scalars["Int"]["output"]>;
  bestTrophies?: Maybe<Scalars["Int"]["output"]>;
  builderBaseLeague?: Maybe<BuilderBaseLeague>;
  builderBaseTrophies?: Maybe<Scalars["Int"]["output"]>;
  builderHallLevel?: Maybe<Scalars["Int"]["output"]>;
  clan?: Maybe<Clan>;
  clanCapitalContributions?: Maybe<Scalars["Int"]["output"]>;
  defenseWins?: Maybe<Scalars["Int"]["output"]>;
  donations?: Maybe<Scalars["Int"]["output"]>;
  donationsReceived?: Maybe<Scalars["Int"]["output"]>;
  expLevel?: Maybe<Scalars["Int"]["output"]>;
  heroEquipment?: Maybe<Array<Maybe<Equipment>>>;
  heroes?: Maybe<Array<Maybe<Hero>>>;
  labels?: Maybe<Array<Maybe<Label>>>;
  league?: Maybe<League>;
  name?: Maybe<Scalars["String"]["output"]>;
  playerHouse?: Maybe<PlayerHouse>;
  role?: Maybe<ERole>;
  spells?: Maybe<Array<Maybe<Spell>>>;
  tag?: Maybe<Scalars["String"]["output"]>;
  townHallLevel?: Maybe<Scalars["Int"]["output"]>;
  townHallWeaponLevel?: Maybe<Scalars["Int"]["output"]>;
  troops?: Maybe<Array<Maybe<Troop>>>;
  trophies?: Maybe<Scalars["Int"]["output"]>;
  warPreference?: Maybe<EWarPreference>;
  warStars?: Maybe<Scalars["Int"]["output"]>;
};

export type VillageQuery = ClientError | Village;

export type VillageTracker = IVillage & {
  __typename?: "VillageTracker";
  achievements?: Maybe<Array<Maybe<Achievement>>>;
  army?: Maybe<Array<Maybe<Army>>>;
  attackWins?: Maybe<Scalars["Int"]["output"]>;
  bestBuilderBaseTrophies?: Maybe<Scalars["Int"]["output"]>;
  bestTrophies?: Maybe<Scalars["Int"]["output"]>;
  builderBaseLeague?: Maybe<BuilderBaseLeague>;
  builderBaseTrophies?: Maybe<Scalars["Int"]["output"]>;
  builderHallLevel?: Maybe<Scalars["Int"]["output"]>;
  builders?: Maybe<Array<Maybe<Builder>>>;
  clan?: Maybe<Clan>;
  clanCapitalContributions?: Maybe<Scalars["Int"]["output"]>;
  /** 还在构建 */
  defences?: Maybe<Array<Maybe<Defences>>>;
  defenseWins?: Maybe<Scalars["Int"]["output"]>;
  donations?: Maybe<Scalars["Int"]["output"]>;
  donationsReceived?: Maybe<Scalars["Int"]["output"]>;
  expLevel?: Maybe<Scalars["Int"]["output"]>;
  heroEquipment?: Maybe<Array<Maybe<Equipment>>>;
  heroes?: Maybe<Array<Maybe<Hero>>>;
  labels?: Maybe<Array<Maybe<Label>>>;
  league?: Maybe<League>;
  name?: Maybe<Scalars["String"]["output"]>;
  playerHouse?: Maybe<PlayerHouse>;
  resource?: Maybe<Array<Maybe<Resource>>>;
  role?: Maybe<ERole>;
  spells?: Maybe<Array<Maybe<Spell>>>;
  tag?: Maybe<Scalars["String"]["output"]>;
  townHallLevel?: Maybe<Scalars["Int"]["output"]>;
  townHallWeaponLevel?: Maybe<Scalars["Int"]["output"]>;
  traps?: Maybe<Array<Maybe<Traps>>>;
  /** 玩家的建筑列表 */
  troops?: Maybe<Array<Maybe<Troop>>>;
  trophies?: Maybe<Scalars["Int"]["output"]>;
  warPreference?: Maybe<EWarPreference>;
  warStars?: Maybe<Scalars["Int"]["output"]>;
};

export type QueryCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type QueryCurrentUserQuery = {
  __typename?: "Query";
  currentUser?: {
    __typename?: "CurrentUser";
    villageTracker?: Array<{
      __typename?: "VillageTracker";
      tag?: string | null;
      name?: string | null;
      expLevel?: number | null;
      trophies?: number | null;
      bestTrophies?: number | null;
      donations?: number | null;
      donationsReceived?: number | null;
      builderHallLevel?: number | null;
      builderBaseTrophies?: number | null;
      bestBuilderBaseTrophies?: number | null;
      warStars?: number | null;
      clanCapitalContributions?: number | null;
      role?: ERole | null;
      warPreference?: EWarPreference | null;
      attackWins?: number | null;
      defenseWins?: number | null;
      townHallLevel?: number | null;
      townHallWeaponLevel?: number | null;
      league?: {
        __typename?: "League";
        id?: string | null;
        name?: string | null;
        iconUrls?: {
          __typename?: "IconUrls";
          medium?: string | null;
          small?: string | null;
          tiny?: string | null;
        } | null;
      } | null;
      builderBaseLeague?: {
        __typename?: "BuilderBaseLeague";
        id?: string | null;
        name?: string | null;
      } | null;
      clan?: {
        __typename?: "Clan";
        tag?: string | null;
        clanLevel?: number | null;
        name?: string | null;
        badgeUrls?: {
          __typename?: "IconUrls";
          medium?: string | null;
          small?: string | null;
          tiny?: string | null;
        } | null;
      } | null;
      troops?: Array<{
        __typename?: "Troop";
        level?: number | null;
        maxLevel?: number | null;
        name?: string | null;
        village?: EVillageType | null;
      } | null> | null;
      heroes?: Array<{
        __typename?: "Hero";
        level?: number | null;
        maxLevel?: number | null;
        name?: string | null;
        village?: string | null;
        equipment?: Array<{
          __typename?: "Equipment";
          level?: number | null;
          maxLevel?: number | null;
          name?: string | null;
          village?: EVillageType | null;
        } | null> | null;
      } | null> | null;
      heroEquipment?: Array<{
        __typename?: "Equipment";
        level?: number | null;
        maxLevel?: number | null;
        name?: string | null;
        village?: EVillageType | null;
      } | null> | null;
      spells?: Array<{
        __typename?: "Spell";
        level?: number | null;
        maxLevel?: number | null;
        name?: string | null;
        village?: string | null;
      } | null> | null;
      labels?: Array<{
        __typename?: "Label";
        id?: number | null;
        name?: string | null;
        iconUrls?: {
          __typename?: "IconUrls";
          medium?: string | null;
          small?: string | null;
          tiny?: string | null;
        } | null;
      } | null> | null;
      achievements?: Array<{
        __typename?: "Achievement";
        completionInfo?: string | null;
        info?: string | null;
        name?: string | null;
        stars?: number | null;
        target?: number | null;
        value?: number | null;
        village?: EVillageType | null;
      } | null> | null;
      playerHouse?: {
        __typename?: "PlayerHouse";
        elements?: Array<{
          __typename?: "Element";
          id?: number | null;
          type?: string | null;
        } | null> | null;
      } | null;
    } | null> | null;
  } | null;
};

export type MutationAddVillageMutationVariables = Exact<{
  tag: Scalars["String"]["input"];
}>;

export type MutationAddVillageMutation = {
  __typename?: "Mutation";
  addVillage?: {
    __typename?: "CurrentUser";
    villageTracker?: Array<{ __typename?: "VillageTracker"; tag?: string | null } | null> | null;
  } | null;
};

export type QuerySearchVillageQueryVariables = Exact<{
  tag: Scalars["String"]["input"];
}>;

export type QuerySearchVillageQuery = {
  __typename?: "Query";
  village?:
    | { __typename: "ClientError"; reason?: string | null; message?: string | null }
    | {
        __typename: "Village";
        tag?: string | null;
        name?: string | null;
        clan?: {
          __typename?: "Clan";
          tag?: string | null;
          name?: string | null;
          badgeUrls?: { __typename?: "IconUrls"; medium?: string | null } | null;
        } | null;
        league?: {
          __typename?: "League";
          id?: string | null;
          name?: string | null;
          iconUrls?: { __typename?: "IconUrls"; medium?: string | null } | null;
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
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "villageTracker" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "tag" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "expLevel" } },
                      { kind: "Field", name: { kind: "Name", value: "trophies" } },
                      { kind: "Field", name: { kind: "Name", value: "bestTrophies" } },
                      { kind: "Field", name: { kind: "Name", value: "donations" } },
                      { kind: "Field", name: { kind: "Name", value: "donationsReceived" } },
                      { kind: "Field", name: { kind: "Name", value: "builderHallLevel" } },
                      { kind: "Field", name: { kind: "Name", value: "builderBaseTrophies" } },
                      { kind: "Field", name: { kind: "Name", value: "bestBuilderBaseTrophies" } },
                      { kind: "Field", name: { kind: "Name", value: "warStars" } },
                      { kind: "Field", name: { kind: "Name", value: "clanCapitalContributions" } },
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
                                  { kind: "Field", name: { kind: "Name", value: "small" } },
                                  { kind: "Field", name: { kind: "Name", value: "tiny" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "builderBaseLeague" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "clan" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "tag" } },
                            { kind: "Field", name: { kind: "Name", value: "clanLevel" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "badgeUrls" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "medium" } },
                                  { kind: "Field", name: { kind: "Name", value: "small" } },
                                  { kind: "Field", name: { kind: "Name", value: "tiny" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      { kind: "Field", name: { kind: "Name", value: "warPreference" } },
                      { kind: "Field", name: { kind: "Name", value: "attackWins" } },
                      { kind: "Field", name: { kind: "Name", value: "defenseWins" } },
                      { kind: "Field", name: { kind: "Name", value: "townHallLevel" } },
                      { kind: "Field", name: { kind: "Name", value: "townHallWeaponLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "troops" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "level" } },
                            { kind: "Field", name: { kind: "Name", value: "maxLevel" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "village" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "heroes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "level" } },
                            { kind: "Field", name: { kind: "Name", value: "maxLevel" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "village" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "equipment" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "level" } },
                                  { kind: "Field", name: { kind: "Name", value: "maxLevel" } },
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "village" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "heroEquipment" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "level" } },
                            { kind: "Field", name: { kind: "Name", value: "maxLevel" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "village" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "spells" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "level" } },
                            { kind: "Field", name: { kind: "Name", value: "maxLevel" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "village" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "labels" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "iconUrls" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "medium" } },
                                  { kind: "Field", name: { kind: "Name", value: "small" } },
                                  { kind: "Field", name: { kind: "Name", value: "tiny" } },
                                ],
                              },
                            },
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "achievements" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "completionInfo" } },
                            { kind: "Field", name: { kind: "Name", value: "info" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "stars" } },
                            { kind: "Field", name: { kind: "Name", value: "target" } },
                            { kind: "Field", name: { kind: "Name", value: "value" } },
                            { kind: "Field", name: { kind: "Name", value: "village" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "playerHouse" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "elements" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  { kind: "Field", name: { kind: "Name", value: "type" } },
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
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "villageTracker" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "tag" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MutationAddVillageMutation, MutationAddVillageMutationVariables>;
export const QuerySearchVillageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "querySearchVillage" },
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
                    name: { kind: "Name", value: "ClientError" },
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
                  typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Village" } },
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
} as unknown as DocumentNode<QuerySearchVillageQuery, QuerySearchVillageQueryVariables>;
