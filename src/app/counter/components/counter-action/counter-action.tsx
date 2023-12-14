"use client";

import { useState } from "react";

import styles from "@/app/counter/page.module.css";
import { useCountStore } from "@/app/counter/components/counter-action/store";

export default function CounterAction() {
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  const { count, increment, decrement } = useCountStore()

  if (typeof window !== 'undefined') {
    console.log('window === undefined');
  }

  return (
    <>
      <div className={styles.row}>
        <button className={styles.button} aria-label="Decrement value" onClick={() => decrement(1)}>
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} aria-label="Increment value" onClick={() => increment(1)}>
          +
        </button>
      </div>

      <div className={styles.row}>
        <input className={styles.textbox}
               aria-label="Set increment amount"
               value={incrementAmount}
               onChange={(e) => setIncrementAmount(e.target.value)}/>
        <button className={styles.button} onClick={() => (increment(incrementValue))}>
          Add Amount
        </button>
        {/*<button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(incrementValue))}>*/}
        {/*  Add Async*/}
        {/*</button>*/}
        {/*<button className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>*/}
        {/*  Add If Odd*/}
        {/*</button>*/}
      </div>
    </>

  );
}
