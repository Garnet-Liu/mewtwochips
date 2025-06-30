"use client";

import { forwardRef, HTMLAttributes, ReactNode, useState } from "react";
import { composeRefs } from "@radix-ui/react-compose-refs";
import { LoaderCircle } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { createPortal } from "react-dom";

import { cn } from "@/common/utils";

export type SpinProps = {
  size?: number;
  loading?: boolean;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

export const Spin = forwardRef<HTMLElement, Readonly<SpinProps>>(function SpinRef(props, ref) {
  const { size = 30, className, loading = false, children, ...other } = props;

  const [container, setContainer] = useState<HTMLElement | null>(null);

  const show = !!container && loading;

  return (
    <>
      <Slot {...other} ref={composeRefs(ref, setContainer)} className={cn("relative", className)}>
        {children}
      </Slot>

      {show &&
        createPortal(
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <LoaderCircle className="animate-spin" size={size} />
          </div>,
          container,
        )}
    </>
  );
});
