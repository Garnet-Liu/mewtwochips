"use client";

import { QueryRef, useMutation, useQueryRefHandlers, useReadQuery } from "@apollo/client";
import { useCallback } from "react";
import { LoaderCircle, Repeat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QBooksQuery } from "@/apollo/gql/graphql";
import { addBookMutation } from "@/apollo/client/mutation";
import { cn } from "@/lib/utils";

interface IProps {
  queryRef: QueryRef<QBooksQuery>;
}

export function Books(props: Readonly<IProps>) {
  const { queryRef } = props;

  const { refetch } = useQueryRefHandlers(queryRef);
  const { data } = useReadQuery(queryRef);

  const [addBook, { loading }] = useMutation(addBookMutation);

  const callRefatchHandle = useCallback(async () => {
    const result = await refetch();
    console.log("callRefatchHandle result", result);
  }, [refetch]);

  const addBookHandle = useCallback(async () => {
    const result = await addBook({ variables: { title: "New book", author: "New author" } });
    console.log("result", result);
  }, [addBook]);

  const Icon = loading ? LoaderCircle : Repeat;

  return (
    <div>
      <div className="flex gap-2">
        <Button size="sm" disabled={loading} onClick={callRefatchHandle}>
          <Icon className={cn("h-4 w-4", loading ? "animate-spin" : "")} />
          Refetch
        </Button>

        <Button size="sm" disabled={loading} onClick={addBookHandle}>
          <Icon className={cn("h-4 w-4", loading ? "animate-spin" : "")} />
          Add book
        </Button>
      </div>

      {data.books?.map((book) => {
        return <div key={book?.id}>{book?.title}</div>;
      })}
    </div>
  );
}
