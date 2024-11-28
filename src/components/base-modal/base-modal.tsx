"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function BaseModal({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const openChangeHandle = useCallback(
    (o: boolean) => {
      if (!o) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  return (
    <Dialog open={true} onOpenChange={openChangeHandle}>
      <DialogContent close={false} className="max-w-max">
        <VisuallyHidden asChild>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription></DialogDescription>
        </VisuallyHidden>

        {children}
      </DialogContent>
    </Dialog>
  );
}
