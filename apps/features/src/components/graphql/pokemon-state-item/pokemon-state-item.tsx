import type { Maybe } from "@repo/ui/lib/maybe";
import { cn } from "@repo/ui/lib/utils";
import type { ReactNode } from "react";

import { StatsType } from "@/graphql/graphql";

interface IProps {
  children: ReactNode;
  name_id: Maybe<StatsType>;
}

export function PokemonStateItem(props: IProps) {
  const { children, name_id } = props;
  return (
    <div
      className={cn("flex items-center px-2 py-1", {
        "bg-[#97c87a]": name_id === StatsType.Hp,
        "bg-[#c39cd8]": name_id === StatsType.Speed,
        "bg-[#fae192]": name_id === StatsType.Attack,
        "bg-[#fbb977]": name_id === StatsType.Defense,
        "bg-[#a2d4da]": name_id === StatsType.SpecialAttack,
        "bg-[#89a9cd]": name_id === StatsType.SpecialDefense,
      })}
    >
      {children}
    </div>
  );
}
