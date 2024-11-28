"use client";

import { useCallback, useRef } from "react";
import { Minus, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux-store/hooks";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { decrement, increment, incrementByAmount, init } from "@/redux-store/reducer";

export function CounterRedux() {
  const amountRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const { value, loading } = useAppSelector((s) => s.counter);

  const dispatchHandle = useCallback(
    (name: string) => {
      return () => {
        switch (name) {
          case "init":
            dispatch(init());
            break;
          case "increment":
            dispatch(increment());
            break;
          case "decrement":
            dispatch(decrement());
            break;
          case "incrementByAmount":
            if (amountRef.current?.value) {
              dispatch(incrementByAmount(Number(amountRef.current.value)));
            }
            break;
          default:
            console.log("default...");
        }
        console.log("switch end...");
      };
    },
    [dispatch],
  );

  const count = value.toString();

  return (
    <div className="contents">
      <h1 className="self-center text-right">Redux state:</h1>

      <div className="flex gap-3">
        <Button disabled={loading} size="icon" type="button" onClick={dispatchHandle("decrement")}>
          <Plus />
        </Button>

        <InputOTP maxLength={count.length} value={count}>
          <InputOTPGroup>
            {new Array(count.length).fill(0).map((_, index) => (
              <InputOTPSlot index={index} key={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button disabled={loading} size="icon" type="button" onClick={dispatchHandle("increment")}>
          <Minus />
        </Button>

        <Input ref={amountRef} className="w-20 text-center" type="number" />

        <Button disabled={loading} onClick={dispatchHandle("incrementByAmount")}>
          Increment by amount
        </Button>

        <Button disabled={loading} onClick={dispatchHandle("init")}>
          Init
        </Button>
      </div>
    </div>
  );
}
