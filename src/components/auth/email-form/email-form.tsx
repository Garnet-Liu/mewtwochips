"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useT } from "@/app/i18n/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const formSchema = z.object({
  email: z.string().email({ message: "The email is request." }),
  password: z.string().min(8, { message: "The password is request." }),
});

interface IProps {
  text: string;
  forget?: boolean;
  callback: (v: z.infer<typeof formSchema>) => void;
}

export function EmailForm(props: IProps) {
  const { text, forget = false, callback } = props;

  const { i18n } = useT();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("=========> onSubmit", values);
    callback(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-96 flex-col gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage>
                <FormDescription>This is your email.</FormDescription>
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {forget ? (
                <div className="inline-flex w-full items-center gap-2">
                  <FormLabel className="flex-1">Password</FormLabel>

                  <Link
                    href={`/${i18n.resolvedLanguage}/auth/forgot-password`}
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              ) : (
                <FormLabel>Password</FormLabel>
              )}

              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage>
                <FormDescription>This is your password.</FormDescription>
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit">{text}</Button>
      </form>
    </Form>
  );
}
