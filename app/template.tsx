import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  console.log("Root Template");
  return (
    <>{children}</>
  );
}
