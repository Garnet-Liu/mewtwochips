"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

const counterSchema = z.object({
  count: z.coerce.number().positive({ message: "Must be greater than 0." }),
});

export function CounterForm() {
  const form = useForm<z.infer<typeof counterSchema>>({
    resolver: zodResolver(counterSchema),
    defaultValues: { count: 1 },
    // disabled: loading,
  });

  function onSubmit(values: z.infer<typeof counterSchema>) {
    console.log("values", values);
    // dispatch(fetchCounter({ count: values.count, now: value }))
    //   .then(unwrapResult)
    //   .catch((e) => {
    //     toast.error(e?.message);
    //   });
  }

  return (
    <Form {...form}>
      <h1 className="self-center text-right">Form state:</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
        <div className="flex gap-3">
          <Button type="submit">
            <Loading loading={false}>
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
