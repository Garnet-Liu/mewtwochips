"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { Repeat } from "lucide-react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { fetchCounter } from "@/redux-store/reducer";
import { useAppDispatch, useAppSelector } from "@/redux-store/hooks";

const counterSchema = z.object({
  count: z.coerce.number().positive({ message: "Must be greater than 0." }),
});

export function CounterForm() {
  const dispatch = useAppDispatch();

  const { value, loading } = useAppSelector((s) => s.counter);

  const form = useForm<z.infer<typeof counterSchema>>({
    resolver: zodResolver(counterSchema),
    defaultValues: { count: 1 },
    disabled: loading,
  });

  function onSubmit(values: z.infer<typeof counterSchema>) {
    dispatch(fetchCounter({ count: values.count, now: value })).then(unwrapResult);
  }

  return (
    <Form {...form}>
      <h1 className="self-center text-right">Form state:</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>
            <Loading loading={loading}>
              <Repeat size={16} />
            </Loading>
            Async reducer
          </Button>

          <FormField
            control={form.control}
            name="count"
            render={({ field }) => {
              return (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Input className="w-20 text-center" type="number" {...field} />
                  </FormControl>
                  <FormMessage>
                    <FormDescription>This is your input count.</FormDescription>
                  </FormMessage>
                </FormItem>
              );
            }}
          />
        </div>
      </form>
    </Form>
  );
}
