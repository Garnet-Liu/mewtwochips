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
import { QAllPokemonQuery } from "@/apollo/gql/graphql";

interface IProps {
  pokemon: NonNullable<NonNullable<QAllPokemonQuery["pokemonAll"]>["results"]>[number];
}

export function PokemonItem({ pokemon }: IProps) {
  const boxStyle = { borderColor: pokemon?.color ?? "" };

  return (
    <Card style={boxStyle}>
      <CardHeader className="p-3">
        <CardTitle>{pokemon?.name}</CardTitle>
        <CardDescription>{pokemon?.genera}</CardDescription>
      </CardHeader>

      <CardContent className="p-3 pt-0">
        <div className="relative overflow-hidden">
          <div className="mt-[100%]"></div>
          {!!pokemon?.images?.official_default && (
            <Image
              src={pokemon.images.official_default}
              fill
              priority
              sizes="20vw"
              alt="pokemon"
              className="object-contain"
            />
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        全国编号：#{String(pokemon?.order).padStart(4, "0")}
      </CardFooter>
    </Card>
  );
}
