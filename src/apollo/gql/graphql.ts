/* eslint-disable */
import { GraphQLResolveInfo } from "graphql";
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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Abilities = {
  entries?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  name_id?: Maybe<Scalars["String"]["output"]>;
};

export type Book = {
  __typename?: "Book";
  author?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addBook?: Maybe<Book>;
  check?: Maybe<Scalars["Boolean"]["output"]>;
  deleteBook?: Maybe<Book>;
};

export type MutationAddBookArgs = {
  author: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationDeleteBookArgs = {
  id: Scalars["String"]["input"];
};

export type Pokemon = {
  __typename?: "Pokemon";
  abilities?: Maybe<Array<Maybe<PokemonAbilities>>>;
  color?: Maybe<Scalars["String"]["output"]>;
  flavor_text?: Maybe<Scalars["String"]["output"]>;
  genera?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["String"]["output"]>;
  images?: Maybe<PokemonImages>;
  name?: Maybe<Scalars["String"]["output"]>;
  name_id?: Maybe<Scalars["String"]["output"]>;
  order?: Maybe<Scalars["Int"]["output"]>;
  stats?: Maybe<Array<Maybe<PokemonStats>>>;
  weight?: Maybe<Scalars["Int"]["output"]>;
};

export type PokemonAbilities = Abilities & {
  __typename?: "PokemonAbilities";
  entries?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  is_hidden?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  name_id?: Maybe<Scalars["String"]["output"]>;
};

export type PokemonImages = {
  __typename?: "PokemonImages";
  back_default?: Maybe<Scalars["String"]["output"]>;
  back_shiny?: Maybe<Scalars["String"]["output"]>;
  dream_default?: Maybe<Scalars["String"]["output"]>;
  dream_shiny?: Maybe<Scalars["String"]["output"]>;
  front_default?: Maybe<Scalars["String"]["output"]>;
  front_shiny?: Maybe<Scalars["String"]["output"]>;
  official_default?: Maybe<Scalars["String"]["output"]>;
  official_shiny?: Maybe<Scalars["String"]["output"]>;
};

export type PokemonPage = {
  __typename?: "PokemonPage";
  count?: Maybe<Scalars["Int"]["output"]>;
  limit?: Maybe<Scalars["Int"]["output"]>;
  offset?: Maybe<Scalars["Int"]["output"]>;
  results?: Maybe<Array<Maybe<Pokemon>>>;
};

export type PokemonStats = Stats & {
  __typename?: "PokemonStats";
  base_stat?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  name_id?: Maybe<StatsType>;
};

export type Query = {
  __typename?: "Query";
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
  checks?: Maybe<Scalars["Boolean"]["output"]>;
  pokemon?: Maybe<Pokemon>;
  pokemonAll?: Maybe<PokemonPage>;
};

export type QueryBookArgs = {
  id: Scalars["String"]["input"];
};

export type QueryPokemonArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPokemonAllArgs = {
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
};

export type Stats = {
  id?: Maybe<Scalars["ID"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  name_id?: Maybe<StatsType>;
};

export enum StatsType {
  Attack = "ATTACK",
  Defense = "DEFENSE",
  Hp = "HP",
  SpecialAttack = "SPECIAL_ATTACK",
  SpecialDefense = "SPECIAL_DEFENSE",
  Speed = "SPEED",
}

export type FPokemonAbilitiesFragment = {
  __typename: "PokemonAbilities";
  id?: string | null;
  name?: string | null;
  name_id?: string | null;
  entries?: string | null;
  is_hidden?: boolean | null;
};

export type FPokemonStatsFragment = {
  __typename: "PokemonStats";
  id?: string | null;
  name?: string | null;
  name_id?: StatsType | null;
  base_stat?: number | null;
};

export type FPokemonFragment = {
  __typename: "Pokemon";
  id?: string | null;
  name?: string | null;
  name_id?: string | null;
  order?: number | null;
  genera?: string | null;
  color?: string | null;
  flavor_text?: string | null;
  images?: {
    __typename?: "PokemonImages";
    front_default?: string | null;
    front_shiny?: string | null;
    back_default?: string | null;
    back_shiny?: string | null;
    official_default?: string | null;
    official_shiny?: string | null;
  } | null;
  abilities?: Array<{
    __typename: "PokemonAbilities";
    id?: string | null;
    name?: string | null;
    name_id?: string | null;
    entries?: string | null;
    is_hidden?: boolean | null;
  } | null> | null;
};

export type MAddBookMutationVariables = Exact<{
  title: Scalars["String"]["input"];
  author: Scalars["String"]["input"];
}>;

export type MAddBookMutation = {
  __typename?: "Mutation";
  addBook?: {
    __typename?: "Book";
    id?: string | null;
    title?: string | null;
    author?: string | null;
  } | null;
};

export type QAllPokemonQueryVariables = Exact<{
  offset: Scalars["Int"]["input"];
  limit: Scalars["Int"]["input"];
}>;

export type QAllPokemonQuery = {
  __typename?: "Query";
  pokemonAll?: {
    __typename: "PokemonPage";
    count?: number | null;
    limit?: number | null;
    offset?: number | null;
    results?: Array<{
      __typename: "Pokemon";
      id?: string | null;
      name?: string | null;
      name_id?: string | null;
      order?: number | null;
      genera?: string | null;
      color?: string | null;
      flavor_text?: string | null;
      images?: {
        __typename?: "PokemonImages";
        front_default?: string | null;
        front_shiny?: string | null;
        back_default?: string | null;
        back_shiny?: string | null;
        official_default?: string | null;
        official_shiny?: string | null;
      } | null;
      abilities?: Array<{
        __typename: "PokemonAbilities";
        id?: string | null;
        name?: string | null;
        name_id?: string | null;
        entries?: string | null;
        is_hidden?: boolean | null;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type QBookQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type QBookQuery = {
  __typename?: "Query";
  book?: {
    __typename?: "Book";
    id?: string | null;
    title?: string | null;
    author?: string | null;
  } | null;
};

export type QBooksQueryVariables = Exact<{ [key: string]: never }>;

export type QBooksQuery = {
  __typename?: "Query";
  books?: Array<{
    __typename?: "Book";
    id?: string | null;
    title?: string | null;
    author?: string | null;
  } | null> | null;
};

export type QPokemonQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type QPokemonQuery = {
  __typename?: "Query";
  pokemon?: {
    __typename: "Pokemon";
    id?: string | null;
    name?: string | null;
    name_id?: string | null;
    order?: number | null;
    genera?: string | null;
    color?: string | null;
    flavor_text?: string | null;
    stats?: Array<{
      __typename: "PokemonStats";
      id?: string | null;
      name?: string | null;
      name_id?: StatsType | null;
      base_stat?: number | null;
    } | null> | null;
    images?: {
      __typename?: "PokemonImages";
      front_default?: string | null;
      front_shiny?: string | null;
      back_default?: string | null;
      back_shiny?: string | null;
      official_default?: string | null;
      official_shiny?: string | null;
    } | null;
    abilities?: Array<{
      __typename: "PokemonAbilities";
      id?: string | null;
      name?: string | null;
      name_id?: string | null;
      entries?: string | null;
      is_hidden?: boolean | null;
    } | null> | null;
  } | null;
};

export const FPokemonStatsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FPokemonStats" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PokemonStats" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "name_id" } },
          { kind: "Field", name: { kind: "Name", value: "base_stat" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FPokemonStatsFragment, unknown>;
export const FPokemonAbilitiesFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FPokemonAbilities" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PokemonAbilities" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "name_id" } },
          { kind: "Field", name: { kind: "Name", value: "entries" } },
          { kind: "Field", name: { kind: "Name", value: "is_hidden" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FPokemonAbilitiesFragment, unknown>;
export const FPokemonFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FPokemon" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Pokemon" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "name_id" } },
          { kind: "Field", name: { kind: "Name", value: "order" } },
          { kind: "Field", name: { kind: "Name", value: "genera" } },
          { kind: "Field", name: { kind: "Name", value: "color" } },
          { kind: "Field", name: { kind: "Name", value: "flavor_text" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "front_default" } },
                { kind: "Field", name: { kind: "Name", value: "front_shiny" } },
                { kind: "Field", name: { kind: "Name", value: "back_default" } },
                { kind: "Field", name: { kind: "Name", value: "back_shiny" } },
                { kind: "Field", name: { kind: "Name", value: "official_default" } },
                { kind: "Field", name: { kind: "Name", value: "official_shiny" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "abilities" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "FPokemonAbilities" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FPokemonAbilities" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PokemonAbilities" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "name_id" } },
          { kind: "Field", name: { kind: "Name", value: "entries" } },
          { kind: "Field", name: { kind: "Name", value: "is_hidden" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FPokemonFragment, unknown>;
export const MAddBookDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "MAddBook" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "title" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "author" } },
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
            name: { kind: "Name", value: "addBook" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: { kind: "Variable", name: { kind: "Name", value: "title" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "author" },
                value: { kind: "Variable", name: { kind: "Name", value: "author" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "author" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MAddBookMutation, MAddBookMutationVariables>;
export const QAllPokemonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "QAllPokemon" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pokemonAll" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: { kind: "Variable", name: { kind: "Name", value: "offset" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: { kind: "Variable", name: { kind: "Name", value: "limit" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "count" } },
                { kind: "Field", name: { kind: "Name", value: "limit" } },
                { kind: "Field", name: { kind: "Name", value: "offset" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "results" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "FragmentSpread", name: { kind: "Name", value: "FPokemon" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FPokemonAbilities" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PokemonAbilities" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "name_id" } },
          { kind: "Field", name: { kind: "Name", value: "entries" } },
          { kind: "Field", name: { kind: "Name", value: "is_hidden" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FPokemon" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Pokemon" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "name_id" } },
          { kind: "Field", name: { kind: "Name", value: "order" } },
          { kind: "Field", name: { kind: "Name", value: "genera" } },
          { kind: "Field", name: { kind: "Name", value: "color" } },
          { kind: "Field", name: { kind: "Name", value: "flavor_text" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "front_default" } },
                { kind: "Field", name: { kind: "Name", value: "front_shiny" } },
                { kind: "Field", name: { kind: "Name", value: "back_default" } },
                { kind: "Field", name: { kind: "Name", value: "back_shiny" } },
                { kind: "Field", name: { kind: "Name", value: "official_default" } },
                { kind: "Field", name: { kind: "Name", value: "official_shiny" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "abilities" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "FPokemonAbilities" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QAllPokemonQuery, QAllPokemonQueryVariables>;
export const QBookDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "QBook" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
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
            name: { kind: "Name", value: "book" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "author" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QBookQuery, QBookQueryVariables>;
export const QBooksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "QBooks" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "books" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "author" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QBooksQuery, QBooksQueryVariables>;
export const QPokemonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "QPokemon" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pokemon" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "FPokemon" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "stats" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "FragmentSpread", name: { kind: "Name", value: "FPokemonStats" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FPokemonAbilities" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PokemonAbilities" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "name_id" } },
          { kind: "Field", name: { kind: "Name", value: "entries" } },
          { kind: "Field", name: { kind: "Name", value: "is_hidden" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FPokemon" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Pokemon" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "name_id" } },
          { kind: "Field", name: { kind: "Name", value: "order" } },
          { kind: "Field", name: { kind: "Name", value: "genera" } },
          { kind: "Field", name: { kind: "Name", value: "color" } },
          { kind: "Field", name: { kind: "Name", value: "flavor_text" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "front_default" } },
                { kind: "Field", name: { kind: "Name", value: "front_shiny" } },
                { kind: "Field", name: { kind: "Name", value: "back_default" } },
                { kind: "Field", name: { kind: "Name", value: "back_shiny" } },
                { kind: "Field", name: { kind: "Name", value: "official_default" } },
                { kind: "Field", name: { kind: "Name", value: "official_shiny" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "abilities" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "FPokemonAbilities" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "FPokemonStats" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "PokemonStats" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "name_id" } },
          { kind: "Field", name: { kind: "Name", value: "base_stat" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QPokemonQuery, QPokemonQueryVariables>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Abilities: PokemonAbilities;
  Stats: PokemonStats;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Abilities: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Abilities"]>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Book: ResolverTypeWrapper<Book>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Pokemon: ResolverTypeWrapper<Pokemon>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  PokemonAbilities: ResolverTypeWrapper<PokemonAbilities>;
  PokemonImages: ResolverTypeWrapper<PokemonImages>;
  PokemonPage: ResolverTypeWrapper<PokemonPage>;
  PokemonStats: ResolverTypeWrapper<PokemonStats>;
  Query: ResolverTypeWrapper<{}>;
  Stats: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Stats"]>;
  StatsType: StatsType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Abilities: ResolversInterfaceTypes<ResolversParentTypes>["Abilities"];
  String: Scalars["String"]["output"];
  ID: Scalars["ID"]["output"];
  Book: Book;
  Mutation: {};
  Boolean: Scalars["Boolean"]["output"];
  Pokemon: Pokemon;
  Int: Scalars["Int"]["output"];
  PokemonAbilities: PokemonAbilities;
  PokemonImages: PokemonImages;
  PokemonPage: PokemonPage;
  PokemonStats: PokemonStats;
  Query: {};
  Stats: ResolversInterfaceTypes<ResolversParentTypes>["Stats"];
};

export type AbilitiesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Abilities"] = ResolversParentTypes["Abilities"],
> = {
  __resolveType: TypeResolveFn<"PokemonAbilities", ParentType, ContextType>;
  entries?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name_id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export type BookResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Book"] = ResolversParentTypes["Book"],
> = {
  author?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  addBook?: Resolver<
    Maybe<ResolversTypes["Book"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddBookArgs, "author" | "title">
  >;
  check?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  deleteBook?: Resolver<
    Maybe<ResolversTypes["Book"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteBookArgs, "id">
  >;
};

export type PokemonResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Pokemon"] = ResolversParentTypes["Pokemon"],
> = {
  abilities?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["PokemonAbilities"]>>>,
    ParentType,
    ContextType
  >;
  color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  flavor_text?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  genera?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  images?: Resolver<Maybe<ResolversTypes["PokemonImages"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name_id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  stats?: Resolver<Maybe<Array<Maybe<ResolversTypes["PokemonStats"]>>>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonAbilitiesResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PokemonAbilities"] = ResolversParentTypes["PokemonAbilities"],
> = {
  entries?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  is_hidden?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name_id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonImagesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PokemonImages"] = ResolversParentTypes["PokemonImages"],
> = {
  back_default?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  back_shiny?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  dream_default?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  dream_shiny?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  front_default?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  front_shiny?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  official_default?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  official_shiny?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonPageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PokemonPage"] = ResolversParentTypes["PokemonPage"],
> = {
  count?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  offset?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes["Pokemon"]>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PokemonStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PokemonStats"] = ResolversParentTypes["PokemonStats"],
> = {
  base_stat?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name_id?: Resolver<Maybe<ResolversTypes["StatsType"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  book?: Resolver<
    Maybe<ResolversTypes["Book"]>,
    ParentType,
    ContextType,
    RequireFields<QueryBookArgs, "id">
  >;
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes["Book"]>>>, ParentType, ContextType>;
  checks?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  pokemon?: Resolver<
    Maybe<ResolversTypes["Pokemon"]>,
    ParentType,
    ContextType,
    Partial<QueryPokemonArgs>
  >;
  pokemonAll?: Resolver<
    Maybe<ResolversTypes["PokemonPage"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPokemonAllArgs, "limit" | "offset">
  >;
};

export type StatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Stats"] = ResolversParentTypes["Stats"],
> = {
  __resolveType: TypeResolveFn<"PokemonStats", ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name_id?: Resolver<Maybe<ResolversTypes["StatsType"]>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Abilities?: AbilitiesResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Pokemon?: PokemonResolvers<ContextType>;
  PokemonAbilities?: PokemonAbilitiesResolvers<ContextType>;
  PokemonImages?: PokemonImagesResolvers<ContextType>;
  PokemonPage?: PokemonPageResolvers<ContextType>;
  PokemonStats?: PokemonStatsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
};
