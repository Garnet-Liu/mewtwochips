"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPokemon } from "@/app/(protected)/pokemon/libs/types";

interface IPokemonItemProps {
  pokemon: IPokemon;
}

export function PokemonItem({ pokemon }: IPokemonItemProps) {
  const boxStyle = { borderColor: pokemon.pokemon_color };

  return (
    <Card style={boxStyle}>
      <CardHeader className="p-3">
        <CardTitle>{pokemon.pokemon_name}</CardTitle>
        <CardDescription>{pokemon.pokemon_genera}</CardDescription>
      </CardHeader>

      <CardContent className="p-3 pt-0">
        <div className="relative overflow-hidden">
          <div className="mt-[100%]"></div>
          {pokemon.pokemon_photo ? (
            <Image
              src={pokemon.pokemon_photo}
              fill
              priority
              sizes="full"
              alt="pokemon"
              className="object-cover"
            />
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">全国编号：#{String(pokemon.id).padStart(4, "0")}</CardFooter>
    </Card>
  );
}
