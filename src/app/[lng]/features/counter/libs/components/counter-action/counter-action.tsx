"use client";

import { Button, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import { env } from "../../../../../../../../env.mjs";
import { baseFetchRequest } from "@/context/apiFetchRequest";
import { useAppDispatch, useAppSelector } from "@/app/[lng]/libs/store/hooks";
import { decrement, increment, incrementByAmount } from "@/app/[lng]/libs/store/features";

import styles from "./counter-action.module.css";

export function CounterAction() {
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    baseFetchRequest(`${env.NEXT_PUBLIC_API_BASE_URL}/api/features/counter`, {
      method: "post",
      body: JSON.stringify({ amount: 10 }),
    }).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <>
      <div className={styles.row}>
        <Button size="2" aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </Button>

        <span className={styles.value}>{count}</span>

        <Button size="2" aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </Button>
      </div>

      <div className={styles.row}>
        <TextField.Root className="w-14">
          <TextField.Input
            size="3"
            value={incrementAmount}
            onChange={(e) => {
              setIncrementAmount(e.target.value);
            }}
          />
        </TextField.Root>

        <Button size="3" onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </Button>

        <Button
          size="3"
          onClick={() => {
            baseFetchRequest(`${env.NEXT_PUBLIC_API_BASE_URL}/api/features/counter`).then((res) => {
              console.log(res);
            });
          }}
        >
          Add Amount
        </Button>
      </div>
    </>
  );
}
