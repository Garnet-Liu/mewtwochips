"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface IAuthProviderProps {
  children: ReactNode;
  intercept?: IIntercept[];
}

interface IIntercept {
  state: "authenticated" | "unauthenticated" | "loading";
  redirect: string;
}

export default function AuthGuardProvider({ children, intercept = [] }: IAuthProviderProps) {
  const { status } = useSession();
  const router = useRouter();

  const isRedirect = intercept.find((s) => s.state === status);

  if (status === "authenticated") {
    return <>{children}</>;
  } else if (status === "unauthenticated") {
    isRedirect && router.push(isRedirect.redirect);
  } else {
    return <div className="mt-60 flex w-full items-center justify-center text-xl">Loading...</div>;
  }
}
