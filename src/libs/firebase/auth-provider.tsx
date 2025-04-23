"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "@firebase/auth";

import { env } from "@/env";
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
      const firebaseConfig = new URLSearchParams({
        appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
        apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
        // databaseURL: env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      }).toString();
      console.log("firebaseConfig", firebaseConfig);
      navigator.serviceWorker
        .register(`/firebase-sw.js?${firebaseConfig}`, { scope: "/", updateViaCache: "none" })
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
      setAuthState({ user, loading: false });
    });
  }, []);

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
