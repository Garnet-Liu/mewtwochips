"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Loading } from "@repo/ui/components/loading";
import { Repeat } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const counterSchema = z.object({
  count: z.coerce.number<number>().positive({ message: "Must be greater than 0." }),
});

type CounterForm = z.infer<typeof counterSchema>;

export function CounterForm() {
  const form = useForm<CounterForm>({
    resolver: zodResolver(counterSchema),
    defaultValues: { count: 1 },
  });

  function onSubmit(values: CounterForm) {
    console.log("values", values);
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
                <FormItem className="flex items-center space-y-0 space-x-3">
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
