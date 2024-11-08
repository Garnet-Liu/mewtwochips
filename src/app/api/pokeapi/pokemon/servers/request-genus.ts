import { FlavorText, Genus, Name, PokemonSpecies } from "pokenode-ts";

import { baseFetchRequest } from "@/lib/fetch-request";

const LANGUAGE = ["zh-Hans", "en", "ja-Hrkt"];

export interface ISpecies {
  pokemon_color: string;
  pokemon_name: string;
  pokemon_genera: string;
  pokemon_flavor_text: string;
}

export const requestSpecies = async (speciesUrl: string): Promise<ISpecies> => {
  const species = await baseFetchRequest<PokemonSpecies>(speciesUrl);

  const name = requestName(species.names);
  const genera = requestGenus(species.genera);
  const flavorText = requestFlavorText(species.flavor_text_entries);

  return {
    pokemon_name: name,
    pokemon_genera: genera,
    pokemon_flavor_text: flavorText,
    pokemon_color: species.color.name,
  };
};

export const requestGenus = (genera: Genus[]): string => {
  let value = "";

  LANGUAGE.some((lang) => {
    const generaLang = genera.find((item) => item.language.name === lang);
    value = generaLang?.genus ?? "";
    return generaLang;
  });

  return value;
};

export const requestName = (names: Name[]): string => {
  let value = "";

  LANGUAGE.some((lang) => {
    const generaLang = names.find((item) => item.language.name === lang);
    value = generaLang?.name ?? "";
    return generaLang;
  });

  return value;
};

export const requestFlavorText = (names: FlavorText[]): string => {
  let value = "";

  LANGUAGE.some((lang) => {
    const generaLang = names.find((item) => item.language.name === lang);
    value = generaLang?.flavor_text ?? "";
    return generaLang;
  });

  return value;
};
