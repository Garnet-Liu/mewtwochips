import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { QAllPokemonQuery } from "@/apollo/gql/graphql";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface IProps {
  abilities: NonNullable<
    NonNullable<NonNullable<QAllPokemonQuery["pokemonAll"]>["results"]>[0]
  >["abilities"];
}

export function Abilities(props: IProps) {
  const { abilities } = props;

  const showAbilities = useMemo(() => {
    return Array.from(new Set((abilities ?? []).map((a) => a?.id))).map((id) => {
      return abilities?.find((a) => a?.id === id);
    });
  }, [abilities]);

  return (
    <div className="flex items-center gap-1">
      {showAbilities.map((a) => {
        return (
          <HoverCard key={`pokemon-abilities-${a?.id}`}>
            <HoverCardTrigger>
              <Badge
                className="whitespace-nowrap"
                variant={a?.is_hidden ? "destructive" : "secondary"}
              >
                {a?.name}
              </Badge>
            </HoverCardTrigger>

            <HoverCardContent>{a?.entries}</HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}
