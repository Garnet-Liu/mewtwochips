import { ReactNode } from "react";

export const metadata = {
  title: "Photos",
};

export default function ChildLayout({ children }: { children: ReactNode }) {
  return <div className="relative m-auto w-[1200px]">{children}</div>;
}
