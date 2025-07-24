import { Maybe } from "@repo/ui/lib/maybe";

import { PokemonDataSource } from "@/apollo/schemas/source";

export interface IContext {
  pokemon: PokemonDataSource;
}

export const LANGUAGE = ["zh-Hans", "zh-Hant", "ja", "en"];

export interface PokemonArgs {
  id?: Maybe<string>;
  url?: Maybe<string>;
  name?: Maybe<string>;
}
