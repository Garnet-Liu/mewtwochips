"use client";

import { type AuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useCallback, useMemo, useState } from "react";
import { signIn } from "next-auth/react";

import { firebaseAuth } from "@/firebase/firebase";

const googleProvider = new GoogleAuthProvider();

export const useGoogleAuthHandle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthSignOut = useCallback(() => {
    console.log("handleOAuthSignOut");
    return signOut(firebaseAuth);
  }, []);

  const handleOAuthSignIn = useCallback(
    (provider: AuthProvider) => {
      return () => {
        setIsLoading(true);
        signInWithPopup(firebaseAuth, provider)
          .then(async (credential) => {
            const idToken = await credential.user.getIdToken(true);
            return signIn("credentials", {
              id: credential.user.uid,
              name: credential.user.displayName,
              email: credential.user.email,
              image: credential.user.photoURL,
              emailVerified: credential.user.emailVerified,
              idToken: idToken,
            });
          })
          .catch(() => handleOAuthSignOut())
          .finally(() => setIsLoading(false));
      };
    },
    [handleOAuthSignOut],
  );

  return useMemo(() => {
    return {
      isLoading: isLoading,
      signIn: handleOAuthSignIn(googleProvider),
      signOut: handleOAuthSignOut,
    };
  }, [handleOAuthSignIn, handleOAuthSignOut, isLoading]);
};
