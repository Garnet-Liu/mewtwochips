import { useTransaction } from "wagmi";
import { goerli } from "wagmi/chains";
import { stringify } from "viem";

export default function Web3Transactions() {
  const { data, isError, isLoading } = useTransaction({
    chainId: goerli.id,
    hash: "0x228d8f1e75c7951f5ccd168507d00343ff0f41847e72d98e6533baccc9894d08"
  });

  if (isLoading) {
    return <div>Fetching transaction…</div>;
  } else if (isError) {
    return <div>Error fetching transaction</div>;
  } else {
    return (
      <div>
        <p>Transaction: </p>
        <pre><code>{stringify(data, null, 2)}</code></pre>
      </div>
    );
  }
}
