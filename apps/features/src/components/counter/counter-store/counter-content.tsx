"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/components/input-otp";
import { Minus, Plus } from "lucide-react";
import { useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { useCounterStore } from "./counter-provider";

export function CounterContent() {
  const amountRef = useRef<HTMLInputElement>(null);

  const { count, init, decrement, increment, incrementByAmount } = useCounterStore(
    useShallow((c) => {
      return {
        count: c.count,
        init: c.init,
        decrement: c.decrement,
        increment: c.increment,
        incrementByAmount: c.incrementByAmount,
      };
    }),
  );

  const value = count.toString();

  const loading = false;

  return (
    <div className="contents">
      <h1 className="self-center text-right">Store state:</h1>

      <div className="flex gap-3">
        <Button disabled={loading} size="icon" type="button" onClick={decrement}>
          <Minus />
        </Button>

        <InputOTP maxLength={value.length} value={value}>
          <InputOTPGroup>
            {new Array(value.length).fill(0).map((_, index) => (
              <InputOTPSlot index={index} key={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button disabled={loading} size="icon" type="button" onClick={increment}>
          <Plus />
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
