import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Separator } from "@repo/ui/components/separator";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { SiGoogle, SiGithub } from "react-icons/si";
import { navigate } from "vike/client/router";
import { z } from "zod";

import { SignInFormSchema } from "@/components/auth/auth-tab/auth-schema";
import { authClient } from "@/lib/auth-client";

export function SignIn() {
  const toast = useToast();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof SignInFormSchema>) => {
      console.log("data", data);
      const redirect = new URLSearchParams(window.location.search).get("redirect");
      await authClient.signIn.email(
        { email: data.email, password: data.password },
        {
          onRequest: () => {
            toast("Signing in...");
          },
          onSuccess: () => {
            navigate(redirect ?? "/");
          },
          onError: ({ error }: { error: string | unknown }) => {
            const message = typeof error === "string" ? error : "Failed to sign in";
            toast.error(message);
          },
        },
      );
    },
    [toast],
  );
  return (
    <Card className="grid gap-6 p-6">
      <div className="grid gap-6">
        <Button className="w-full">
          <SiGithub className="mr-2 h-5 w-5" /> Sign In via GitHub
        </Button>
        <Button className="w-full">
          <SiGoogle className="mr-2 h-5 w-5" /> Sign In via Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground relative px-2">
            Or continue with
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
    </Card>
  );
}
