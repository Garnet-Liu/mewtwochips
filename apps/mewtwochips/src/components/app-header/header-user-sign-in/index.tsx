"use client";

import { Button } from "@repo/ui/components/button";
import { useCallback } from "react";

import { signIn } from "@/lib/auth/auth-client";

export function HeaderUserSignIn() {
  const signInHandle = useCallback(() => {
    signIn.oauth2({
      /**
       * The social provider ID
       * @example "github", "google", "apple"
       */
      providerId: "mc-coc",
      /**
       * A URL to redirect after the user authenticates with the provider
       * @default "/"
       */
      callbackURL: "/",
      /**
       * A URL to redirect if an error occurs during the sign-in process
       */
      // errorCallbackURL: "/error",
      /**
       * A URL to redirect if the user is newly registered
       */
      // newUserCallbackURL: "/welcome",
      /**
       * disable the automatic redirect to the provider.
       * @default false
       */
      // disableRedirect: true,
    });
  }, []);
  return <Button onClick={signInHandle}>Sign in</Button>;
}
