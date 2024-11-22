"use client";

import { useAuthHandle } from "@/hooks";
import { EmailForm } from "@/components/auth/email-form";

export function SignInEmail() {
  const { signInWithEmail } = useAuthHandle();

  return <EmailForm text="Sign in with email" callback={signInWithEmail} />;
}
