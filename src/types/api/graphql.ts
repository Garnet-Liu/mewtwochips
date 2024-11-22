import { PokemonDataSource } from "@/apollo/schemas/source";
import { Maybe } from "@/types/maybe";

export interface IContext {
  pokemon: PokemonDataSource;
}

export const LANGUAGE = ["zh-Hans", "zh-Hant", "ja", "en"];

export interface PokemonArgs {
  id?: Maybe<string>;
  url?: Maybe<string>;
  name?: Maybe<string>;
}
