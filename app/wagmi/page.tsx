import PageHeader from "@/app/components/page-header/page-header";
import WagmiConnect from "@/app/wagmi/components/wagmi-connect/wagmi-connect";

export default function Web3() {
  return (
    <div className="w-[1200px] mx-auto bg-white mt-5">
      {/* @ts-expect-error Server Component */}
      <PageHeader pageTitle="Web3" backRoute="/"/>

      <WagmiConnect/>
    </div>
  );
}
