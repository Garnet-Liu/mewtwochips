"use client";

import { useSuspenseQuery } from "@apollo/client";

import { bookQuery } from "@/apollo/client/query";

export function Book() {
  const { data } = useSuspenseQuery(bookQuery, { variables: { id: "1" } });

  return (
    <div>
      <p>{data.book?.title}</p>
    </div>
  );
}
