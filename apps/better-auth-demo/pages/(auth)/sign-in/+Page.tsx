import { Feather } from "lucide-react";

import { AuthTab } from "@/components/auth/auth-tab";

export default function SignInPage() {
  return (
    <div className="relative container grid h-screen flex-col items-center justify-center p-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Feather className="mr-2 h-6 w-6" />
          Better auth sign in
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;We are solving general physical intelligence -- one policy gradient at a
              time.&rdquo;
            </p>
            <footer className="text-sm">Test Labs</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          </div>

          <AuthTab />
        </div>
      </div>
    </div>
  );
}
