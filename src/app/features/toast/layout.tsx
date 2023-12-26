"use client";

import { ReactNode } from "react";

import { Toasts } from "@/app/features/toast/Toast";

interface Props {
  children: ReactNode;
}

export default function ToastLayout({ children }: Props) {
  return (
    <Toasts vertical="down" horizontal="left" swipeDirection="down">
      {children}
    </Toasts>
  );
}
