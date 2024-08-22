"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/context/cn";
import { Maybe } from "@/types/globals";

interface DrawerProps {
  children: ReactNode;
  content: ReactNode;
}

export function Drawer(props: DrawerProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [container, setContainer] = useState<Maybe<HTMLElement>>();

  const { children, content } = props;

  useEffect(() => {
    if (ref.current) {
      setContainer(ref.current?.parentElement);
    }
  }, []);

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild ref={ref}>
        {children}
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal container={container}>
        <DialogPrimitive.Overlay
          className={cn([
            "data-[state=open]:animate-overlayShow",
            "fixed",
            "inset-0",
            "bg-black/25",
            "dark:bg-white/25",
          ])}
        />

        <DialogPrimitive.Content
          className={cn([
            "data-[state=open]:animate-contentShow",
            "fixed",
            "right-0",
            "top-0",
            "z-10",
            "h-screen",
            "min-w-[42vw]",
            "bg-[var(--color-background)]",
            "focus:outline-none",
            "data-[state=open]:animate-in",
            "data-[state=open]:slide-in-from-right",
            "data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-right",
          ])}
        >
          <div className={cn(["h-screen"])}>{content}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
