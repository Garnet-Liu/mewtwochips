"use client";

import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygon, sepolia } from "wagmi/chains";
import { MetaMaskConnector } from "@wagmi/connectors/metaMask";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ReactNode } from "react";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  process.env.NODE_ENV === "development"
    ? ([goerli, sepolia] as Chain[])
    : ([mainnet, polygon] as Chain[]),
  [alchemyProvider({ apiKey: "dVCnF6xTNwkd9HDMeKaFL0CZlVR_k2DL" }), publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [new MetaMaskConnector({ chains })],
  webSocketPublicClient,
});

interface IWeb3WagmiProviderProps {
  children: ReactNode;
}

export default function WagmiProvider({ children }: IWeb3WagmiProviderProps) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
