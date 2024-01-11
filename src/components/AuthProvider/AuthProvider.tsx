"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";

import { apiFetchRequest } from "@/context/apiFetchRequest";
import { clientAuth } from "@/context/firebase/client/firebaseClient";
import { AuthContext, EAuthState } from "@/context/firebase/client/useCurrentUser";

interface Props {
  children: ReactNode;
}

export const AuthProvider = (props: Props) => {
  const { children } = props;
  const [status, setStatus] = useState<EAuthState>(EAuthState.LOADING);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth(), async (user) => {
      console.log("onAuthStateChanged", user);
      if (user) {
        const idToken = await user.getIdToken();
        console.log("idToken", idToken);
        await apiFetchRequest("/api/auth/session", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        setStatus(EAuthState.AUTHENTICATED);
        setCurrentUser(user);
      } else {
        setStatus(EAuthState.UNAUTHENTICATED);
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  console.log("AuthProvider", { status, currentUser });

  return <AuthContext.Provider value={{ status, currentUser }}>{children}</AuthContext.Provider>;
};
