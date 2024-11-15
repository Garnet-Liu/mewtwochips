import { cn } from "@/lib/utils";
import { Maybe } from "@/types/maybe";
import { QPokemonQuery, StatsType } from "@/apollo/gql/graphql";

interface IProps {
  color: Maybe<string>;
  stats: NonNullable<QPokemonQuery["pokemon"]>["stats"];
}

export function PokemonState({ stats, color }: IProps) {
  return (
    <div
      className="w-full items-center overflow-hidden rounded-xl border bg-white/25"
      style={{ borderColor: color ?? "" }}
    >
      <h3 className="py-8 text-center font-bold">种族值</h3>

      <div className="grid grid-cols-[auto_auto_1fr]">
        {stats?.map(async (stat) => {
          const classname = cn("flex items-center p-2", {
            "bg-[#97c87a]": stat?.name_id === StatsType.Hp,
            "bg-[#c39cd8]": stat?.name_id === StatsType.Speed,
            "bg-[#fae192]": stat?.name_id === StatsType.Attack,
            "bg-[#fbb977]": stat?.name_id === StatsType.Defense,
            "bg-[#a2d4da]": stat?.name_id === StatsType.SpecialAttack,
            "bg-[#89a9cd]": stat?.name_id === StatsType.SpecialDefense,
          });
          return (
            <div key={`pokemon-state-${stat?.id}`} className="contents">
              <div className={classname}>{stat?.name}:</div>
              <div className={classname}>{stat?.base_stat}</div>
              <div className={classname}>
                <div
                  style={{ width: `calc(100% * ${stat?.base_stat}/255)` }}
                  className={cn("h-5 border", {
                    "border-[#558936] bg-[#8ac654]": stat?.name_id === StatsType.Hp,
                    "border-[#3c2957] bg-[#a456d0]": stat?.name_id === StatsType.Speed,
                    "border-[#ccbc33] bg-[#f8cb3c]": stat?.name_id === StatsType.Attack,
                    "border-[#b4673d] bg-[#d98837]": stat?.name_id === StatsType.Defense,
                    "border-[#1a7e8d] bg-[#59c3d0]": stat?.name_id === StatsType.SpecialAttack,
                    "border-[#004689] bg-[#5890cd]": stat?.name_id === StatsType.SpecialDefense,
                  })}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
