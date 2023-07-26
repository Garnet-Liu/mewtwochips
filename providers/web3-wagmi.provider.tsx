"use client";

import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygon, sepolia } from "wagmi/chains";
import { MetaMaskConnector } from "@wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { ReactNode } from "react";

console.log(process.env.NODE_ENV);
console.log(sepolia);

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  process.env.NODE_ENV === "development" ? [goerli, sepolia] as Chain[] : [mainnet, polygon] as Chain[],
  [publicProvider()]
);

console.log("chains", chains);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [new MetaMaskConnector({ chains })],
  webSocketPublicClient
});

interface IWeb3WagmiProviderProps {
  children: ReactNode;
}

export default function Web3WagmiProvider({ children }: IWeb3WagmiProviderProps) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  );
}
