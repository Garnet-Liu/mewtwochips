import PageHeader from "@/app/components/page-header/page-header";
import Web3Connect from "@/app/web3/components/web3-connect/web3-connect";

export default function Web3() {
  return (
    <div className="w-[1200px] mx-auto bg-white mt-5">
      {/* @ts-expect-error Server Component */}
      <PageHeader pageTitle="Web3" backRoute="/"/>

      <Web3Connect/>
    </div>
  );
}
