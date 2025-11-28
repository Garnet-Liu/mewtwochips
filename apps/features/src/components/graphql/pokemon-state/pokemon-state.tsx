import type { Maybe } from "@repo/ui/lib/maybe";
import { cn } from "@repo/ui/lib/utils";

import { PokemonStateItem } from "@/components/graphql/pokemon-state-item";
import { type QPokemonQuery, StatsType } from "@/graphql/graphql";

interface IProps {
  color: Maybe<string>;
  stats: NonNullable<QPokemonQuery["pokemon"]>["stats"];
}

export function PokemonState({ stats, color }: IProps) {
  return (
    <div
      className="w-full items-center overflow-hidden rounded-xl border"
      style={{ borderColor: color ?? "" }}
    >
      <h3 className="py-8 text-center font-bold">种族值</h3>

      <div className="grid grid-cols-[auto_auto_1fr]">
        {stats?.map(async (data) => {
          return (
            <div key={`pokemon-state-${data?.id}`} className="contents">
              <PokemonStateItem name_id={data?.name_id}>{data?.name}:</PokemonStateItem>
              <PokemonStateItem name_id={data?.name_id}>{data?.base_stat}</PokemonStateItem>
              <PokemonStateItem name_id={data?.name_id}>
                <div
                  style={{ width: `calc(100% * ${data?.base_stat}/255)` }}
                  className={cn("h-5 border", {
                    "border-[#558936] bg-[#8ac654]": data?.name_id === StatsType.Hp,
                    "border-[#3c2957] bg-[#a456d0]": data?.name_id === StatsType.Speed,
                    "border-[#ccbc33] bg-[#f8cb3c]": data?.name_id === StatsType.Attack,
                    "border-[#b4673d] bg-[#d98837]": data?.name_id === StatsType.Defense,
                    "border-[#1a7e8d] bg-[#59c3d0]": data?.name_id === StatsType.SpecialAttack,
                    "border-[#004689] bg-[#5890cd]": data?.name_id === StatsType.SpecialDefense,
                  })}
                />
              </PokemonStateItem>
            </div>
          );
        })}
      </div>
    </div>
  );
}
