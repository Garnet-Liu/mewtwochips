"use client";

import { useCallback, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
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

import { firebaseAuth } from "@/firebase/firebase";
import { formSchema } from "@/components/auth/email-form";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const useAuthHandle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthSignOut = useCallback(() => {
    return signOut(firebaseAuth);
  }, []);

  const handleAuthSignIn = useCallback(async (credential: UserCredential) => {
    const idToken = await credential.user.getIdToken(true);
    return signIn("credentials", {
      id: credential.user.uid,
      name: credential.user.displayName,
      email: credential.user.email,
      image: credential.user.photoURL,
      emailVerified: credential.user.emailVerified,
      idToken: idToken,
    });
  }, []);

  const handleOAuthSignIn = useCallback(
    (provider: AuthProvider) => {
      return () => {
        setIsLoading(true);
        signInWithPopup(firebaseAuth, provider)
          .then(handleAuthSignIn)
          .catch((e) => {
            handleOAuthSignOut();
            toast.error(e.message);
          })
          .finally(() => setIsLoading(false));
      };
    },
    [handleAuthSignIn, handleOAuthSignOut],
  );

  const handleEmailSignIn = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      return createUserWithEmailAndPassword(firebaseAuth, values.email, values.password)
        .then(handleAuthSignIn)
        .catch((e) => {
          handleOAuthSignOut();
          toast.error(e.message);
        })
        .finally(() => setIsLoading(false));
    },
    [handleAuthSignIn, handleOAuthSignOut],
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
