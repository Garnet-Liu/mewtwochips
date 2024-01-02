"use client";

import { ApolloError } from "@apollo/client";
import { Button } from "@radix-ui/themes";
import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export function BaseError(props: Props) {
  const { error, reset } = props;

  useEffect(() => {
    // Log the error to an error reporting service
    console.log((error as ApolloError).graphQLErrors);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}
