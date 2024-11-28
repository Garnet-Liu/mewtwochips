"use client";

import { QueryRef, useMutation, useQueryRefHandlers, useReadQuery } from "@apollo/client";
import { Repeat } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { QBooksQuery } from "@/apollo/gql/graphql";
import { Loading } from "@/components/loading/loading";
import { addBookMutation } from "@/apollo/client/mutation";

interface IProps {
  queryRef: QueryRef<QBooksQuery>;
}

export function Books(props: Readonly<IProps>) {
  const { queryRef } = props;

  const { refetch } = useQueryRefHandlers(queryRef);
  const { data } = useReadQuery(queryRef);

  const [addBook, { loading }] = useMutation(addBookMutation);

  const callRefatchHandle = useCallback(() => {
    refetch().catch((e) => {
      console.warn(e);
    });
  }, [refetch]);

  const addBookHandle = useCallback(() => {
    addBook({ variables: { title: "New book", author: "New author" } }).catch((e) => {
      console.warn(e);
    });
  }, [addBook]);

  return (
    <div>
      <div className="flex gap-2">
        <Button size="sm" disabled={loading} onClick={callRefatchHandle}>
          <Loading loading={loading}>
            <Repeat size={16} />
          </Loading>
          Refetch
        </Button>

        <Button size="sm" disabled={loading} onClick={addBookHandle}>
          <Loading loading={loading}>
            <Repeat size={16} />
          </Loading>
          Add book
        </Button>
      </div>

      {data.books?.map((book) => {
        return <div key={book?.id}>{book?.title}</div>;
      })}
    </div>
  );
}
