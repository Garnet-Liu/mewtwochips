import { Badge } from "@repo/ui/components/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@repo/ui/components/hover-card";
import type { Maybe } from "@repo/ui/lib/maybe";
import { useFragment } from "@apollo/client/react";
import { PokemonAbilitiesFragment } from "@/apollo/actions/fragment";

interface IProps {
  id: Maybe<string>;
}

export function PokemonAbilities(props: IProps) {
  const { id } = props;

  const { data } = useFragment({
    fragment: PokemonAbilitiesFragment,
    fragmentName: "FPokemonAbilities",
    from: { __typename: "PokemonAbilities", id },
  });

  return (
    <HoverCard key={`pokemon-abilities-${data?.id}`}>
      <HoverCardTrigger>
        <Badge
          className="whitespace-nowrap"
          variant={data?.is_hidden ? "destructive" : "secondary"}
        >
          {data?.name}
        </Badge>
      </HoverCardTrigger>

      <HoverCardContent>{data?.entries}</HoverCardContent>
    </HoverCard>
  );
}
