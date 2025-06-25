"use client";

import { Minus, Plus } from "lucide-react";
import { useRef } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/zustand-store/counter";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function CounterRedux() {
  const amountRef = useRef<HTMLInputElement>(null);

  const { count, init, decrement, increment, incrementByAmount } = useCounterStore((c) => {
    return {
      count: c.count,
      init: c.actions.init,
      decrement: c.actions.decrement,
      increment: c.actions.increment,
      incrementByAmount: c.actions.incrementByAmount,
    };
  });

  const value = count.toString();

  const loading = false;

  return (
    <div className="contents">
      <h1 className="self-center text-right">Redux state:</h1>

      <div className="flex gap-3">
        <Button disabled={loading} size="icon" type="button" onClick={decrement}>
          <Plus />
        </Button>

        <InputOTP maxLength={value.length} value={value}>
          <InputOTPGroup>
            {new Array(value.length).fill(0).map((_, index) => (
              <InputOTPSlot index={index} key={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button disabled={loading} size="icon" type="button" onClick={increment}>
          <Minus />
        </Button>

        <Input ref={amountRef} className="w-20 text-center" type="number" />

        <Button
          disabled={loading}
          onClick={() => {
            incrementByAmount(Number(amountRef.current?.value));
          }}
        >
          Increment by amount
        </Button>

        <Button disabled={loading} onClick={init}>
          Init
        </Button>
      </div>
    </div>
  );
}
