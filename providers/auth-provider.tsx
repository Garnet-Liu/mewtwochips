"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { EAuthState } from "@/interfaces/auth.interface";
import { useAppSelector } from "@/redux/hooks/redux.hook";

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
    const styles = {
      height: "100vh",
      width: "100%",
      fontSize: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    return <div style={styles}>Loading...</div>;
  } else {
    return <>{children}</>;
  }
}
