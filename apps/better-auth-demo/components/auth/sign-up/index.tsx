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
import { SiGithub, SiGoogle } from "react-icons/si";
import { navigate } from "vike/client/router";
import { z } from "zod";

import { SignUpFormSchema } from "@/components/auth/auth-tab/auth-schema";
import { authClient } from "@/lib/auth-client";

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
    <Card className="grid gap-6 p-6">
      <div className="grid gap-6">
        <Button className="w-full">
          <SiGithub className="size-5" /> Sign Up via GitHub
        </Button>
        <Button className="w-full">
          <SiGoogle className="size-5" /> Sign Up via Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">Or continue with email</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2 w-full">
            Sign up with email
          </Button>
        </form>
      </Form>
    </Card>
  );
}
