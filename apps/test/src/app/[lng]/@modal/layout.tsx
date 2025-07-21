import { ReactNode } from "react";

import { BaseModal } from "@/components/base-modal";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<IProps>) {
  return <BaseModal>{children}</BaseModal>;
}
