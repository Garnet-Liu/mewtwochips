"use client";

import Button from "@/app/components/button/button";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import cn from "classnames";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
  useSendTransaction,
  useSwitchNetwork
} from "wagmi";

import { ITransactionData } from "@/interfaces/webs.interface";
import Web3Transactions from "@/app/web3/components/web3-transactions/web3-transactions";

export default function Web3Connect() {
  console.log("Web3Connect");
  const { chain, chains } = useNetwork();
  const { connector: activeConnector, address, isConnected } = useAccount();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { connect, connectAsync, connectors } = useConnect();
  const { data: balance } = useBalance({ address: address });
  const { disconnect } = useDisconnect();
  const { sendTransactionAsync } = useSendTransaction();

  const { register, handleSubmit, formState } = useForm<ITransactionData>({
    defaultValues: { chain: chain?.id }
  });

  const onSubmit = async (data: ITransactionData) => {
    console.log("onSubmit data", data);
    const chainID = Number(data.chain);
    try {
      if (!isConnected) {
        console.log("========== 链接钱包 ==========");
        const connectResult = await connectAsync({ chainId: chainID });
        console.log("onSubmit connectResult", connectResult);
      } else if (chain?.id !== chainID) {
        console.log("========== 选择网络 ==========");
        const switchResult = await switchNetworkAsync?.(chainID);
        console.log("onSubmit switchResult", switchResult);
      }

      console.log("========== 发送交易 ==========");
      const sendResult = await sendTransactionAsync?.({
        value: parseEther(data.count),
        to: process.env.NEXT_PUBLIC_METAMASK_ACCOUNT as string
      });
      console.log("onSubmit sendResult", sendResult);
    } catch (e) {
      console.log("onSubmit catch", e);
      // @ts-ignore
      console.log("onSubmit catch", e?.message);
    }
  };

  const inputClass = [
    "h-9",
    "mt-1",
    "px-3",
    "py-2",
    "bg-white",
    "border",
    "shadow-sm",
    "border-slate-300",
    "placeholder-slate-400",
    "focus:outline-none",
    "focus:border-sky-500",
    "focus:ring-sky-500",
    "block",
    "w-full",
    "rounded-md",
    "sm:text-sm",
    "focus:ring-1"
  ];

  return (
    <div className="px-10 pb-5">
      <div>Connected to {activeConnector?.name}</div>
      <div>Connected to address: {address}</div>
      <div>Balance: {balance?.formatted} {balance?.symbol}</div>

      {isConnected ? (
        <Button className="mt-1" onClick={() => disconnect()}>Disconnect</Button>
      ) : (
        <>
          {connectors.map((c) => {
            return (
              <Button key={c.id} className="mt-1" onClick={() => connect({ connector: c })}>Connect {c.name}</Button>
            );
          })}
        </>
      )}

      <form className="w-80 my-5" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="chain">Choose a chain:</label>
        <select placeholder="Please choose an chain"
                className={cn(inputClass)}
                id="chain"
                {...register("chain", { required: true })}>
          {chains.map((chain) => {
            return (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            );
          })}
        </select>
        <p className="h-7 pt-1 text-left">{formState?.errors?.chain && <span>This field is required</span>}</p>

        <label htmlFor="count">Count:</label>
        <input placeholder="Please choose an count"
               className={cn(inputClass)}
               autoComplete="off"
               id="count"
               {...register("count", { required: true, min: 0, max: 1000 })} />
        {/* errors will return when field validation fails  */}
        <p className="h-7 pt-1 text-left">{formState?.errors?.count && <span>This field is required</span>}</p>

        <Button className="mt-1" type="submit">Transaction</Button>
      </form>

      <Web3Transactions/>
    </div>
  );
}
