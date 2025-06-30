import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { firebaseServerUser } from "@/libs/firebase/firebase-server";

interface IProps {
  flag?: "in" | "out";
  redirectTo?: string;
  children: ReactNode;
}

export async function RouteGuard(props: Readonly<IProps>) {
  const { children, redirectTo, flag = "in" } = props;

  const user = await firebaseServerUser();

  const isIn = flag === "in";

  console.log("RouteGuard show children => ", isIn ? !!user : !user);

  if (isIn ? !!user : !user) {
    return <>{children}</>;
  } else {
    return redirect(redirectTo ? redirectTo : isIn ? "/auth/login" : "/");
  }
}
