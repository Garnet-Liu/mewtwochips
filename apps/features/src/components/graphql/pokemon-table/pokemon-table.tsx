"use client";

import { type QueryRef, useQueryRefHandlers, useReadQuery } from "@apollo/client/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { PokemonAbilities } from "@/components/graphql/pokemon-abilities";
import { PokemonPagination } from "@/components/graphql/pokemon-pagination";
import { getFragmentData } from "@/graphql";
import {
  FPokemonFragmentDoc,
  type QAllPokemonQuery,
  type QAllPokemonQueryVariables,
} from "@/graphql/graphql";

interface IProps {
  queryRef: QueryRef<QAllPokemonQuery, QAllPokemonQueryVariables>;
}

export function PokemonTable(props: Readonly<IProps>) {
  const { queryRef } = props;

  const router = useRouter();
  const { data } = useReadQuery(queryRef);
  const { refetch } = useQueryRefHandlers(queryRef);

  return (
    <div className="flex flex-col gap-1">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">全国编号</TableHead>
            <TableHead>图片</TableHead>
            <TableHead>名字</TableHead>
            <TableHead>种属</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>特性</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.pokemonAll?.results?.map((pp) => {
            const p = getFragmentData(FPokemonFragmentDoc, pp);
            return (
              <TableRow
                key={`pokemon-${p?.id}`}
                onClick={() => router.push(`/graphql/${p?.name_id}`)}
              >
                <TableCell className="font-medium">#{String(p?.order).padStart(4, "0")}</TableCell>
                <TableCell>
                  <div className="h-10 w-10">
                    {!!p?.images?.official_default && (
                      <Image
                        width={40}
                        height={40}
                        alt="pokemon-cover"
                        src={p.images.official_default}
                        className="h-10 w-10 object-contain"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">{p?.name}</TableCell>
                <TableCell className="whitespace-nowrap">{p?.genera}</TableCell>
                <TableCell className="w-full">{p?.flavor_text}</TableCell>
                <TableCell>
                  <PokemonAbilities abilities={p?.abilities} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <PokemonPagination
        refetch={refetch}
        count={data.pokemonAll?.count}
        offset={data.pokemonAll?.offset}
      />
    </div>
  );
}
