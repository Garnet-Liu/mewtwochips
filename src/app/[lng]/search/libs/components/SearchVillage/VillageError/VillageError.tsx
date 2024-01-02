import { ApolloError } from "@apollo/client";
import { Button } from "@radix-ui/themes";

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export function VillageError(props: Props) {
  const { error, resetErrorBoundary } = props;

  console.log((error as ApolloError).graphQLErrors);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <p>This is a error</p>
      <Button onClick={resetErrorBoundary}>Reset</Button>
    </div>
  );
}
