import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { useToast } from "@repo/ui/hooks/use-toast";
import { cn } from "@repo/ui/lib/utils";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { SiGithub, SiGoogle } from "react-icons/si";
import { navigate } from "vike/client/router";
import { z } from "zod";

import { providerHandle, signInWithGitHub, signInWithGoogle } from "@/lib/auth-actions";
import { authClient } from "@/lib/auth-client";
import { SignInFormSchema } from "@/lib/auth-schema";

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6")}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to sign in to your account
          </p>
        </div>

        <div className="grid gap-6">
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
              <FormItem className="grid-cols-2">
                <FormLabel>Password</FormLabel>

                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>

                <FormControl className="col-span-2">
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage className="col-span-2" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Sign in
          </Button>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

          <Button variant="outline" className="w-full" onClick={providerHandle(signInWithGitHub)}>
            <SiGithub />
            Sign in with GitHub
          </Button>

          <Button variant="outline" className="w-full" onClick={providerHandle(signInWithGoogle)}>
            <SiGoogle />
            Sign in with Google
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </Form>
  );
}
