import { PageHeader } from "@/app/features/components/PageHeader/PageHeader";
import { WagmiConnect } from "@/app/features/wagmi/components/WagmiConnect/WagmiConnect";

export default function Page() {
  return (
    <div className="mx-auto mt-5 w-[1200px]">
      <PageHeader pageTitle="Web3" backRoute="/" />

      <WagmiConnect />
    </div>
  );
}
