"use client";

import { AnimationEvent, MutableRefObject, RefObject, useLayoutEffect, useRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { IconButton } from "@radix-ui/themes";

import { cn } from "@/context/cn";
import { IToast } from "@/app/toast/Toast/interfaces/toast.interface";
import { ToastStatusIcon } from "@/app/toast/Toast/ToastView/ToastStatusIcon/ToastStatusIcon";

export const toastViewVariants = cva(
  [
    "[--viewport-padding:_16px]",
    "[&[data-swipe-direction=right][data-state=open]]:border",
    "absolute",
    "right-4",
    "left-4",
    "transition-[transform]",
    "duration-100",
    "rounded-lg",
    "focus-visible:shadow-[0_0_0_2px_black]",
    "scale-[calc(1-0.05*var(--index))]",
    "after:content-['']",
    "after:absolute",
    "after:w-full",
    "after:h-full",
    "after:left-0",
    "after:right-0",
    "after:bg-transparent",
    "group-hover/viewport:scale-100",
    "data-[hidden=true]:opacity-0",
    "data-[state=closed]:scale-100",
    "data-[swipe=move]:duration-0",
    "data-[swipe=cancel]:transition-[transform_200ms_ease-out]",
  ],
  {
    variants: {
      vertical: {
        up: [
          "translate-y-[calc(var(--stack-gap)*var(--index))]",
          "after:bottom-full",
          "group-hover/viewport:-translate-y-[calc(var(--hover-offset-y)-var(--stack-gap)*var(--index))]",
        ],
        down: ["bottom-4"],
        center: [],
      },
      horizontal: {
        left: [],
        right: [],
        center: [],
      },
      swipe: {
        up: [
          "data-[state=open]:animate-[toast-slide-up-in_150ms_ease-in]",
          "data-[state=closed]:animate-[toast-slide-up-out_100ms_ease-out]",
          "data-[swipe=end]:animate-[toast-slide-up-out_100ms_ease-out]",
          "data-[swipe=move]:!-translate-y-[calc(var(--hover-offset-y)-var(--stack-gap)*var(--index)-var(--radix-toast-swipe-move-y,0))]",
        ],
        down: [
          "data-[state=open]:animate-[toast-slide-down-in_150ms_ease-in]",
          "data-[state=closed]:animate-[toast-slide-down-out_100ms_ease-out]",
          "data-[swipe=end]:animate-[toast-slide-down-out_100ms_ease-out]",
          "data-[swipe=move]:!translate-y-[calc(var(--hover-offset-y)-var(--stack-gap)*var(--index)+var(--radix-toast-swipe-move-y,0))]",
        ],
        left: [
          "data-[state=open]:animate-[toast-slide-left-in_15000ms_ease-in]",
          "data-[state=closed]:animate-[toast-slide-left-out_10000ms_ease-out]",
          "data-[swipe=end]:animate-[toast-slide-left-out_10000ms_ease-out]",
        ],
        right: [
          "data-[state=open]:animate-[toast-slide-right-in_150ms_ease-in]",
          "data-[state=closed]:animate-[toast-slide-right-out_100ms_ease-out]",
          "data-[swipe=end]:animate-[toast-slide-right-out_100ms_ease-out]",
        ],
      },
    },
    compoundVariants: [
      {
        vertical: ["down", "center"],
        class: [
          "-translate-y-[calc(var(--stack-gap)*var(--index))]",
          "after:top-full",
          "group-hover/viewport:translate-y-[calc(var(--hover-offset-y)-var(--stack-gap)*var(--index))]",
        ],
      },
      {
        vertical: ["up", "center"],
        class: ["top-4"],
      },
      {
        swipe: ["left", "right"],
        class: [
          "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
          "data-[swipe=cancel]:translate-x-0",
        ],
      },
    ],
    defaultVariants: {
      swipe: "right",
      vertical: "down",
      horizontal: "right",
    },
  },
);

interface ToastViewProps extends VariantProps<typeof toastViewVariants> {
  id: string;
  toast: IToast;
  toastElementsMapRef: MutableRefObject<Map<string, RefObject<HTMLLIElement>>>;

  sortToasts(): void;

  onOpenChange(open: boolean): void;

  onAnimationEndCapture(e: AnimationEvent<HTMLLIElement>): void;
}

export function ToastView(props: ToastViewProps) {
  const { id, toast, toastElementsMapRef, sortToasts, ...toastProps } = props;
  const ref = useRef<HTMLLIElement>(null);
  const toastElementsMap = toastElementsMapRef?.current;

  useLayoutEffect(() => {
    if (ref.current) {
      toastElementsMap?.set(id, ref);
      sortToasts();
    }
  }, [id, sortToasts, toastElementsMap]);

  return (
    <ToastPrimitive.Root
      {...toastProps}
      ref={ref}
      type={toast.type}
      duration={toast.duration}
      className={toastViewVariants(toastProps)}
    >
      <div
        className={cn([
          "relative",
          "group/item",
          "bg-black",
          "border",
          "border-white/25",
          "p-4",
          "rounded-lg",
          "h-[var(--height)]",
          "shadow-[hsl(206_22%_7%/35%)_0_10px_38px_-10px,hsl(206_22%_7%/20%)_0_10px_20px_-15px]",
          "data-[front=false]:h-[var(--front-height)]",
          "flex",
          "gap-2",
          "items-center",
        ])}
        data-status={toast.status}
      >
        <ToastStatusIcon status={toast.status} />

        <ToastPrimitive.Description className="flex-1 text-xs">
          <ToastPrimitive.Title className="mb-1 text-sm font-medium">
            <p>Scheduled: Catch up</p>
          </ToastPrimitive.Title>

          {toast.description}
        </ToastPrimitive.Description>

        <ToastPrimitive.Action
          className={cn([
            "inline-flex",
            "items-center",
            "justify-center",
            "rounded",
            "border",
            "border-white/50",
            "px-2",
            "leading-6",
            "h-6",
            "text-xs",
            "bg-white/[.15]",
            "leading-6",
            "font-medium",
          ])}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastPrimitive.Action>

        <ToastPrimitive.Close
          asChild
          aria-label="Close"
          className={cn([
            "absolute",
            "left-0",
            "top-0",
            "-translate-x-[35%]",
            "-translate-y-[35%]",
            "opacity-0",
            "transition-opacity",
            "group-hover/item:opacity-100",
          ])}
        >
          <IconButton radius="full" size="1" color="gray">
            <span className="material-symbols-outlined text-base leading-4">close</span>
          </IconButton>
        </ToastPrimitive.Close>
      </div>
    </ToastPrimitive.Root>
  );
}
