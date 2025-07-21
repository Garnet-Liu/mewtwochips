import { ReactNode } from "react";

import { LngParams } from "@/types/lng-params";
import { RouteGuard } from "@/components/route-guard";
import { Navigation } from "@/components/home/navigation";

interface IProps extends LngParams {
  children: ReactNode;
}

export default async function Layout({ children, params }: Readonly<IProps>) {
  const { lng } = await params;
  return (
    <RouteGuard>
      <div className="flex h-full flex-col">
        <Navigation lang={lng} />

        <div className="flex-1">{children}</div>
      </div>
    </RouteGuard>
  );
}
