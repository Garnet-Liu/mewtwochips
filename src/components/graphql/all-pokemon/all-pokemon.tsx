"use client";

import { QueryRef, useQueryRefHandlers, useReadQuery } from "@apollo/client";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QAllPokemonQuery } from "@/apollo/gql/graphql";
import { Abilities, AllPagination } from "@/components/graphql/all-pokemon";

interface IProps {
  queryRef: QueryRef<QAllPokemonQuery>;
}

export function AllPokemon(props: Readonly<IProps>) {
  const { queryRef } = props;

  const { refetch } = useQueryRefHandlers(queryRef);
  const { data } = useReadQuery(queryRef);

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
          {data.pokemonAll?.results?.map((p) => {
            return (
              <TableRow key={`pokemon-${p?.id}`}>
                <TableCell className="font-medium">#{String(p?.order).padStart(4, "0")}</TableCell>
                <TableCell>
                  <div className="h-10 w-10">
                    {p?.images?.official_default ? (
                      <Image
                        width={40}
                        height={40}
                        alt="pokemon-cover"
                        src={p.images.official_default}
                        className="h-10 w-10 object-contain"
                      />
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">{p?.name}</TableCell>
                <TableCell className="whitespace-nowrap">{p?.genera}</TableCell>
                <TableCell className="w-full">{p?.flavor_text}</TableCell>
                <TableCell>
                  <Abilities abilities={p?.abilities} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <AllPagination
        refetch={refetch}
        count={data.pokemonAll?.count}
        offset={data.pokemonAll?.offset}
      />
    </div>
  );
}
