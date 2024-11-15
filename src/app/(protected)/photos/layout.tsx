import { ReactNode } from "react";

export const metadata = {
  title: "Photos",
};

export default function ChildLayout({ children }: { children: ReactNode }) {
  return <div className="max-width relative">{children}</div>;
}
