"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";

import { firebaseAuth } from "@/libs/firebase/firebase-client";

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: false,
});

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

export interface AuthProviderProps {
  user: User | null;
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const { user, children } = props;

  const [authState, setAuthState] = useState<AuthContextValue>({ user, loading: !user });

  useEffect(() => {
    // Install servicerWorker if supported.
    if ("serviceWorker" in navigator) {
      // Convert environment variables to URL `search` parameters
      navigator.serviceWorker
        .register(`/firebase-sw.js`, { scope: "/", updateViaCache: "none" })
        .then((reg) => {
          // Registration worked.
          console.log(`%cRegistration succeeded. Scope is ${reg.scope}`, "color: red;");
        })
        .catch((error) => {
          // Registration failed.
          console.log(`%cRegistration failed with ${error.message}`, "color: red;");
        });
    } else {
      console.log("This is unsupported");
    }
  }, []);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log("Auth state changed", user);

      if (!authState.user && user) {
        location.reload();
      } else {
        setAuthState((a) => {
          a.loading = false;
          return a;
        });
      }
    });
  }, [authState.user]);

  console.log("authState", authState);

  return (
    <AuthContext.Provider value={authState}>
      {authState.loading ? "Loading" : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("Missing AuthContext");
  }
  return auth;
}
