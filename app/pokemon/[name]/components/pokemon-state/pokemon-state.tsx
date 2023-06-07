import { PokemonStat, Stat } from "pokenode-ts";
import classnames from "classnames";

import styles from "./pokemon-state.module.css";
import requestService from "@/services/request.service";

interface IPokemonStateProps {
  color: string;
  stats: PokemonStat[];
}

export default async function PokemonState(props: IPokemonStateProps) {
  const boxStyle = { borderColor: props.color };
  return (
    <div className="w-full rounded-xl border items-center bg-white overflow-hidden" style={boxStyle}>
      <h3 className="text-center leading-[70px] font-medium">种族值</h3>

      {props.stats.map(async (stat) => {
        const name = stat.stat.name;
        const statDetail = await requestService.get<void, Stat>(
          `/api/pokeapi/stat/${name}`
        );
        const statName = statDetail.names.find((item) => item.language.name === "zh-Hans")?.name ?? statDetail.name;
        const stateBGClass = classnames(styles.stats, {
          [styles.statsHP]: name === "hp",
          [styles.statsSpeed]: name === "speed",
          [styles.statsAttack]: name === "attack",
          [styles.statsDefense]: name === "defense",
          [styles.statsSpecialAttack]: name === "special-attack",
          [styles.statsSpecialDefense]: name === "special-defense"
        });
        const stateValueClass = classnames(styles.value, {
          [styles.valueHP]: name === "hp",
          [styles.valueSpeed]: name === "speed",
          [styles.valueAttack]: name === "attack",
          [styles.valueDefense]: name === "defense",
          [styles.valueSpecialAttack]: name === "special-attack",
          [styles.valueSpecialDefense]: name === "special-defense"
        });
        return (
          <div key={name} className={stateBGClass}>
            <div className="flex-[1_1_30%] pr-2.5 pl-5 flex justify-between">
              <div className="uppercase">{statName}:</div>
              <div>{stat.base_stat}</div>
            </div>

            <div className="flex-[1_1_70%]">
              <div style={{ width: `calc(100% * ${stat.base_stat}/255)` }} className={stateValueClass}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
