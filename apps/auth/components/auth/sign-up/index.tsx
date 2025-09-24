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

import { providerHandle, signInWithGitHub, signInWithGoogle } from "@/lib/auth/actions";
import { authClient } from "@/lib/auth/client";
import { SignUpFormSchema } from "@/lib/auth/schema";

export function SignUp() {
  const toast = useToast();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof SignUpFormSchema>) => {
      console.log("data", data);
      await authClient.signUp.email(
        { email: data.email, password: data.password, name: data.name },
        {
          onRequest: () => {
            toast("Signing up...");
          },
          onSuccess: () => {
            navigate("/sign-in");
          },
          onError: (ctx: { error: { message: string } }) => {
            toast.error(ctx.error.message);
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
          <h1 className="text-2xl font-bold">Sign up to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to sign up to your account
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Garnet Liu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Sign up
          </Button>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

          <Button variant="outline" className="w-full" onClick={providerHandle(signInWithGitHub)}>
            <SiGithub />
            Sign up with GitHub
          </Button>

          <Button variant="outline" className="w-full" onClick={providerHandle(signInWithGoogle)}>
            <SiGoogle />
            Sign up with Google
          </Button>
        </div>

        <div className="text-center text-sm">
          Do have an account?{" "}
          <a href="/sign-in" className="underline underline-offset-4">
            Sign in
          </a>
        </div>
      </form>
    </Form>
  );
}
