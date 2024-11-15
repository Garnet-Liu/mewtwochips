import { ReactNode } from "react";

import { RouteGuard } from "@/components/route-guard";
import { Navigation } from "@/components/home/navigation";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<IProps>) {
  return (
    <RouteGuard>
      <div className="flex h-full flex-col">
        <Navigation />

        <div className="flex-1">{children}</div>
      </div>
    </RouteGuard>
  );
}
