import { ReactNode } from "react";

import WagmiProvider from "@/app/[lng]/features/wagmi/components/WagmiProvider/WagmiProvider";

interface ILayoutProps {
  children: ReactNode;
}

export default function Web3Layout({ children }: ILayoutProps) {
  return <WagmiProvider>{children}</WagmiProvider>;
}
