"use client";

import { signInWithCustomToken } from "@firebase/auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { clientAuth } from "@/context/firebaseClient";

export const useFirebaseAuth = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.firebaseToken) {
      signInWithCustomToken(clientAuth, session.user.firebaseToken)
        .then(() => {
          console.log("Login firebase success");
        })
        .catch((error) => {
          console.warn("Logout firebase error", error);
        });
    } else {
      clientAuth.signOut().then(() => console.log("Logout firebase"));
    }
  }, [session?.user?.firebaseToken, status]);

  return status;
};
