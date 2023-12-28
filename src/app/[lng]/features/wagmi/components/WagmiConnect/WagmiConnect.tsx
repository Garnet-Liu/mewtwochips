"use client";

import { useAccount, useBalance, useConnect, useDisconnect, useFeeData, useNetwork } from "wagmi";
import { goerli, sepolia } from "wagmi/chains";
import { Button } from "@radix-ui/themes";
import { useEffect } from "react";

import { WagmiSend } from "@/app/[lng]/features/wagmi/components/WagmiSend/WagmiSend";
import { WagmiTransactions } from "@/app/[lng]/features/wagmi/components/WagmiTransactions/WagmiTransactions";

export function WagmiConnect() {
  console.log("Web3Connect");
  const { chain, chains } = useNetwork();
  const { connector: activeConnector, address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { data: balance } = useBalance({
    address: address,
  });
  const { data: fee } = useFeeData();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    console.log(
      "disconnect useEffect",
      chain && chains.length > 0 && !chains.find((c) => c.id === chain.id),
    );
    if (chain && chains.length > 0 && !chains.find((c) => c.id === chain.id)) {
      disconnect();
    }
  }, [chain, chains, disconnect]);

  if (typeof window !== "undefined") {
    console.log("window === undefined");
  }

  return (
    <div className="px-10 pb-5">
      <div>Connected to {activeConnector?.name}</div>
      <div>Connected to chain: {chain?.name}</div>
      <div>Connected to address: {address}</div>
      <div>
        Balance: {balance?.formatted} {balance?.symbol}
      </div>
      <div>Fee data: {JSON.stringify(fee?.formatted)}</div>

      {isConnected ? (
        <Button className="mt-1" onClick={() => disconnect()}>
          Disconnect
        </Button>
      ) : (
        <>
          {connectors.map((c) => {
            return (
              <Button
                key={c.id}
                className="mt-1"
                onClick={() => connect({ connector: c, chainId: c.chains[0].id })}
              >
                Connect {c.name}
              </Button>
            );
          })}
        </>
      )}

      {isConnected && <WagmiSend />}

      <WagmiTransactions
        hash="0xaecf59a4f9c1313408de4252598b5698884a5f4f841c5ca705552a8150876242"
        chainId={goerli.id}
      />
      <WagmiTransactions
        hash="0xf96b82900c5bb2809a1783a0901a5e38bd0dacf13d75caa85044cc61b92e91c3"
        chainId={sepolia.id}
      />
    </div>
  );
}
