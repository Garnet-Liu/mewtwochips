"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";

interface IAuthProviderProps {
  children: ReactNode;
  intercept?: IIntercept[];
}

interface IIntercept {
  state: 'authenticated' | 'unauthenticated' | 'loading';
  redirect: string;
}

export default function AuthProvider({ children, intercept = [] }: IAuthProviderProps) {
  const {data, status} = useSession()
  const router = useRouter();

  const isRedirect = intercept.find((s) => s.state === status);

  if (status === 'authenticated') {
    return <>{children}</>;
  } else if (status === "unauthenticated") {
    isRedirect && router.push(isRedirect.redirect);
  } else {
    return <div className="w-full text-xl flex items-center justify-center mt-60">Loading...</div>;
  }
}
