import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { headers } from "next/headers";
import { initializeServerApp } from "@firebase/app";
import { getAuth } from "firebase/auth";

import { firebaseConfig } from "@/libs/firebase/configs";

interface IProps {
  flag?: "in" | "out";
  redirectTo?: string;
  children: ReactNode;
}

export async function RouteGuard(props: Readonly<IProps>) {
  const { children, redirectTo, flag = "in" } = props;

  const headersList = await headers();
  const authIdToken = headersList.get("authorization")?.split(" ")[1];

  console.log("authIdToken", authIdToken);

  const serverApp = initializeServerApp(firebaseConfig, { authIdToken });
  const auth = getAuth(serverApp);
  await auth.authStateReady();

  const user = auth.currentUser;

  const isIn = flag === "in";

  console.log("props", { ...props });
  console.log("RouteGuard show children => ", isIn ? !!user : !user);

  if (isIn ? !!user : !user) {
    return <>{children}</>;
  } else {
    return redirect(redirectTo ? redirectTo : isIn ? "/auth/login" : "/");
  }
}
