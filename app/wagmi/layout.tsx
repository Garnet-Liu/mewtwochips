import { ReactNode } from "react";

import AuthProvider from "@/providers/auth.provider";
import { EAuthState } from "@/interfaces/auth.interface";
import Web3WagmiProvider from "@/providers/web3-wagmi.provider";

interface ILayoutProps {
  children: ReactNode;
}

export default function Web3Layout({ children }: ILayoutProps) {
  console.log("Root Layout");
  return (
    <AuthProvider intercept={[{ state: EAuthState.LOGOUT, redirect: "/auth/login" }]}>
      <Web3WagmiProvider>
        {children}
      </Web3WagmiProvider>
    </AuthProvider>

  );
}
