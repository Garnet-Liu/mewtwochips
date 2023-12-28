"use client";

import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";

import { useCountStore } from "@/app/[lng]/features/counter/components/counter-action/store";
import styles from "@/app/[lng]/features/counter/page.module.css";

export function CounterAction() {
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  const { count, increment, decrement } = useCountStore();

  return (
    <>
      <div className={styles.row}>
        <Button size="2" aria-label="Decrement value" onClick={() => decrement(1)}>
          -
        </Button>

        <span className={styles.value}>{count}</span>

        <Button size="2" aria-label="Increment value" onClick={() => increment(1)}>
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

        <Button size="3" onClick={() => increment(incrementValue)}>
          Add Amount
        </Button>
      </div>
    </>
  );
}
