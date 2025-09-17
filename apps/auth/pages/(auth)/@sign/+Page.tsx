import { GalleryVerticalEnd } from "lucide-react";
import { usePageContext } from "vike-react/usePageContext";

import { SignIn } from "@/components/auth/sign-in";
import { SignUp } from "@/components/auth/sign-up";

export default function SignInPage() {
  const { routeParams } = usePageContext();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Mewtwochips Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {routeParams.sign === "sign-in" ? <SignIn /> : <SignUp />}
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src="/assets/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
