import { Chain } from "wagmi";
import { SwitchNetworkArgs } from "@wagmi/core";
import * as _wagmi_core from "@wagmi/core";

export interface ICheckNetworkParams {
  chain?: Chain
  chainID: number;
  isConnected: boolean;
  switchNetworkAsync: ((chainId_?: SwitchNetworkArgs['chainId']) => Promise<_wagmi_core.Chain>) | undefined;
  connectAsync: () => Promise<{chain: Chain}>;
}

export interface ITransactionData {
  count: string;
  chain: number;
}
