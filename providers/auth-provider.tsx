"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { EAuthState } from "@/interfaces/auth.interface";
import { useAppSelector } from "@/hooks/redux.hook";

interface IAuthProviderProps {
  children: ReactNode;
  intercept?: IIntercept[];
}

interface IIntercept {
  state: EAuthState;
  redirect: string;
}

export default function AuthProvider({ children, intercept = [] }: IAuthProviderProps) {
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();

  const isRedirect = intercept.find((s) => s.state === user.state);

  useEffect(() => {
    if (isRedirect) {
      router.push(isRedirect.redirect);
    }
  }, [user.state, isRedirect, router]);

  if (user.state === EAuthState.PENDING || isRedirect) {
    return <div className="w-full text-xl flex items-center justify-center mt-60">Loading...</div>;
  } else {
    return <>{children}</>;
  }
}
