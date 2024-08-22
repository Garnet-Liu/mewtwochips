"use client";

import { createContext, useContext } from "react";
import { User } from "firebase/auth";

import { Maybe } from "@/gql/graphql";

export interface IAuthContext {
  status: EAuthState;
  currentUser: Maybe<User>;
}

export enum EAuthState {
  LOADING = "LOADING",
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}

export const AuthContext = createContext<IAuthContext>({
  status: EAuthState.LOADING,
  currentUser: null,
});

export const useCurrentUser = () => {
  const context = useContext(AuthContext);
  if (context) return context;
  throw new Error("useAuth must be used within Toasts");
};
