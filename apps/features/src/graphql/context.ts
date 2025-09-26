import { PokemonDataSource } from "@/graphql/source";

export interface MyContext {
  userID: string;
  pokemon: PokemonDataSource;
}
