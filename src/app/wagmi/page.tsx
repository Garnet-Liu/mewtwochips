import WagmiConnect from "@/app/wagmi/components/WagmiConnect/WagmiConnect";
import PageHeader from "@/components/PageHeader/PageHeader";

export default function Page() {
  return (
    <div className="mx-auto mt-5 w-[1200px]">
      <PageHeader pageTitle="Web3" backRoute="/" />

      <WagmiConnect />
    </div>
  );
}
