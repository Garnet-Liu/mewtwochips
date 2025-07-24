"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@repo/ui/components/dialog";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function ModalLayout({ children }: Readonly<IProps>) {
  const router = useRouter();
  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(o) => {
        if (!o) router.back();
      }}
    >
      <DialogTitle></DialogTitle>
      <DialogDescription></DialogDescription>
      <DialogContent className="!max-w-3/5" aria-describedby={undefined}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
