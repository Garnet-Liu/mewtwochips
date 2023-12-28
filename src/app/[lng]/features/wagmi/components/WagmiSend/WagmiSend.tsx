"use client";

import { useAccount, useConnect, useNetwork, useSendTransaction, useSwitchNetwork } from "wagmi";
import { useForm } from "react-hook-form";
import { Button } from "@radix-ui/themes";
import { parseEther } from "viem";
import { useId } from "react";

import { cn } from "@/context/cn";

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
  "focus:ring-1",
];

interface ITransactionData {
  count: string;
  chain: number;
}

export function WagmiSend() {
  const passwordHintId = useId();
  const { connectAsync } = useConnect();
  const { isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  const { data, sendTransaction, sendTransactionAsync, status } = useSendTransaction();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { register, handleSubmit, watch, formState } = useForm<ITransactionData>({
    mode: "all",
    defaultValues: { chain: chain?.id },
  });

  console.log("useSendTransaction data", data?.hash);
  console.log("useSendTransaction status", status);

  console.log("formState", formState);
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
      const sendResult = sendTransaction?.({
        chainId: chainID,
        value: parseEther(data.count),
        to: process.env.NEXT_PUBLIC_METAMASK_ACCOUNT as string,
      });
      // const sendResult = await sendTransactionAsync?.({
      //   chainId: chainID,
      //   value: parseEther(data.count),
      //   to: process.env.NEXT_PUBLIC_METAMASK_ACCOUNT as string
      // });
      console.log("onSubmit sendResult", sendResult);
    } catch (e) {
      const error = e as { message: string; code: number };
      console.log("onSubmit catch", e);
      console.log("onSubmit catch", error?.message);
      console.log("onSubmit catch", error?.code);
    }
  };

  return (
    <form className="my-5 w-80" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="chain">Choose a chain:</label>
      <select
        // placeholder="Please choose an chain"
        className={cn(inputClass)}
        id="chain"
        {...register("chain", { required: true })}
      >
        {chains.map((chain) => {
          return (
            <option key={chain.id} value={chain.id}>
              {chain.name}
            </option>
          );
        })}
      </select>

      <p className="h-7 pt-1 text-left">
        {formState?.errors?.chain && <span>This field is required</span>}
      </p>

      <label htmlFor="count">Count:</label>
      <input
        placeholder="Eg: 0.0001"
        className={cn(inputClass)}
        autoComplete="off"
        id="count"
        aria-describedby={passwordHintId}
        {...register("count", { required: true, pattern: /^\d+(\.\d{0,4})?$/ })}
      />
      {/* errors will return when field validation fails  */}
      <p id={passwordHintId} className="h-7 pt-1 text-left">
        {formState?.errors?.count && <span>This field is required</span>}
      </p>

      <Button className="mt-1" type="submit">
        Transaction
      </Button>
    </form>
  );
}
