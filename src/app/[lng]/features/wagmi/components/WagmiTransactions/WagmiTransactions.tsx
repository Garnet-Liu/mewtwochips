import { useTransaction } from "wagmi";
import { stringify } from "viem";

import { cn } from "@/context/cn";

import styles from "./WagmiTransactions.module.css";

interface IProps {
  hash: `0x${string}`;
  chainId: number;
}

export function WagmiTransactions(props: IProps) {
  const { data, isError, isLoading } = useTransaction({
    chainId: props.chainId,
    hash: props.hash,
  });

  if (isLoading) {
    return <div className="mt-1">Fetching transaction…</div>;
  } else if (isError) {
    return <div className="mt-1">Error fetching transaction</div>;
  } else {
    return (
      <>
        <details className={cn("mt-1", styles.container)}>
          <summary className={styles.title}>Transaction: {props.hash}</summary>
        </details>

        <pre className={styles.content}>
          <code>{stringify(data, null, 2)}</code>
        </pre>
      </>
    );
  }
}
