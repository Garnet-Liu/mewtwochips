"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import {
  type AuthProvider,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type UserCredential,
} from "firebase/auth";

import { formSchema } from "@/components/auth/email-form";
import { firebaseAuth } from "@/libs/firebase/firebase-client";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const useAuthHandle = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthSignOut = useCallback(async () => {
    try {
      await signOut(firebaseAuth);
      router.refresh();
    } catch (error) {
      console.log("handleOAuthSignOut", error);
    }
  }, [router]);

  const handleAuthSignIn = useCallback((credential: UserCredential) => {
    console.log("handleAuthSignIn", credential);
  }, []);

  const handleOAuthSignIn = useCallback(
    (provider: AuthProvider) => {
      return () => {
        setIsLoading(true);
        signInWithPopup(firebaseAuth, provider)
          .then(handleAuthSignIn)
          .catch((e) => toast.error(e.message))
          .finally(() => setIsLoading(false));
      };
    },
    [handleAuthSignIn],
  );

  const handleEmailSignIn = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      return createUserWithEmailAndPassword(firebaseAuth, values.email, values.password)
        .then(handleAuthSignIn)
        .catch((e) => toast.error(e.message))
        .finally(() => setIsLoading(false));
    },
    [handleAuthSignIn],
  );

  return useMemo(() => {
    return {
      isLoading: isLoading,
      signOut: handleOAuthSignOut,
      signInWithEmail: handleEmailSignIn,
      signInWithGoogle: handleOAuthSignIn(googleProvider),
      signInWithGithub: handleOAuthSignIn(githubProvider),
    };
  }, [handleEmailSignIn, handleOAuthSignIn, handleOAuthSignOut, isLoading]);
};
