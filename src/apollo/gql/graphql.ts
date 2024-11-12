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
