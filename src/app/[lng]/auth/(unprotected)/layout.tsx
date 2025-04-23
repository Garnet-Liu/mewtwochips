import { ReactNode } from "react";

import { RouteGuard } from "@/components/route-guard";

interface IProps {
  children: ReactNode;
}

export default async function Layout({ children }: Readonly<IProps>) {
  console.log("Login layout");
  return <RouteGuard flag="out">{children}</RouteGuard>;
}
