import { Badge } from "@repo/ui/components/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@repo/ui/components/hover-card";
import type { Maybe } from "@repo/ui/lib/maybe";

import { PokemonAbilitiesFragment } from "@/apollo/client/fragment";
import { type FragmentType, useFragment } from "@/graphql";
import { FPokemonAbilitiesFragmentDoc } from "@/graphql/graphql";

interface IProps {
  abilities: Maybe<Maybe<FragmentType<typeof PokemonAbilitiesFragment>>[]>;
}

export function PokemonAbilities(props: IProps) {
  const { abilities } = props;

  return (
    <div className="flex items-center gap-1">
      {abilities?.map((a) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = useFragment(FPokemonAbilitiesFragmentDoc, a);
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
      })}
    </div>
  );
}
