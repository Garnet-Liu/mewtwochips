import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/auth";
import { UserAuthForm } from "@/app/auth/login/libs/components/user-auth-form";

export default async function LoginPage() {
  const session = await auth();

  if (!!session) {
    redirect("/");
  }

  return (
    <div className="flex h-full items-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign up your account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email asd password below to sign up your account
          </p>
        </div>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
