import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { auth } from "@/next-auth/auth";

interface IProps {
  flag?: "in" | "out";
  redirectTo?: string;
  children: ReactNode;
}

export async function RouteGuard(props: Readonly<IProps>) {
  const { children, redirectTo, flag = "in" } = props;

  const session = await auth();

  if (flag === "in" ? !!session : !session) {
    return <>{children}</>;
  } else {
    redirect(redirectTo ? redirectTo : "/auth/login");
  }
}
