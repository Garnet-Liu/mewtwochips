import classnames from "classnames";

import { IPokemonDetail } from "@/app/features/pokemon/types/pokemon.interface";

import styles from "./pokemon-state.module.css";

interface IPokemonStateProps {
  pokemon: IPokemonDetail;
}

export function PokemonState({ pokemon }: IPokemonStateProps) {
  const boxStyle = { borderColor: pokemon.pokemon_color };
  return (
    <div
      className="w-full items-center overflow-hidden rounded-xl border bg-white/25"
      style={boxStyle}
    >
      <h3 className="text-center font-medium leading-[70px]">种族值</h3>
      {pokemon.stats.map(async (stat) => {
        const stateBGClass = classnames(styles.stats, {
          [styles.statsHP]: stat.name === "hp",
          [styles.statsSpeed]: stat.name === "speed",
          [styles.statsAttack]: stat.name === "attack",
          [styles.statsDefense]: stat.name === "defense",
          [styles.statsSpecialAttack]: stat.name === "special-attack",
          [styles.statsSpecialDefense]: stat.name === "special-defense",
        });
        const stateValueClass = classnames(styles.value, {
          [styles.valueHP]: stat.name === "hp",
          [styles.valueSpeed]: stat.name === "speed",
          [styles.valueAttack]: stat.name === "attack",
          [styles.valueDefense]: stat.name === "defense",
          [styles.valueSpecialAttack]: stat.name === "special-attack",
          [styles.valueSpecialDefense]: stat.name === "special-defense",
        });
        return (
          <div key={stat.name} className={stateBGClass}>
            <div className="flex flex-[1_1_30%] justify-between pl-5 pr-2.5">
              <div className="uppercase">{stat.stat_name}:</div>
              <div>{stat.base_stat}</div>
            </div>

            <div className="flex-[1_1_70%]">
              <div
                style={{ width: `calc(100% * ${stat.base_stat}/255)` }}
                className={stateValueClass}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
