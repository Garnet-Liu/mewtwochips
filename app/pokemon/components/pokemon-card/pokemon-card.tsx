import { Pokemon, PokemonSpecies } from "pokenode-ts";
import Image from "next/image";
import Link from "next/link";

import styles from './pokemon-card.module.css'
import requestService from "@/services/request.service";

interface IPokemonResponse {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

interface IPokemonCardProps {
  id: number;
}

export default async function PokemonCard({ id }: IPokemonCardProps) {
  const { pokemon, species } = await requestService.get<void, IPokemonResponse>(
    `/api/pokeapi/pokemon/${id}`
  );
  const zhName = species.names.find((item) => item.language.name === "zh-Hans");
  const name = zhName?.name ?? species.name;
  return (
    <div className="w-60 p-2 flex items-center justify-center flex-col">
      <Link className="cursor-pointer hover:scale-105 transition ease-in-out w-full " href={`/pokemon/${pokemon.name}`}>
        <div className='w-full overflow-hidden border rounded-xl flex items-center justify-center flex-col relative' style={{ borderColor: species.color.name }}>
          <div className={styles.pokemonImage}>
            <div className={styles.span}></div>
            <Image src={pokemon.sprites.other?.["official-artwork"].front_default || ""} fill={true} priority={true} sizes='100%' alt="pokemon"/>
          </div>
          <p>{name}</p>
        </div>
      </Link>
    </div>
  );
}
