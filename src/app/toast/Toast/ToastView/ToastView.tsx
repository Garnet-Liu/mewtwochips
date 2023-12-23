"use client";

import { AnimationEvent, MutableRefObject, RefObject, useLayoutEffect, useRef } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { IconButton } from "@radix-ui/themes";

import { cn } from "@/context/cn";
import { IToast } from "@/app/toast/Toast/interfaces/toast.interface";
import { ToastStatusIcon } from "@/app/toast/Toast/ToastView/ToastStatusIcon/ToastStatusIcon";

interface ToastViewProps {
  id: string;
  toast: IToast;
  toastElementsMapRef: MutableRefObject<Map<string, RefObject<HTMLLIElement>>>;

  sortToasts(): void;

  onOpenChange(open: boolean): void;

  onAnimationEnd(e: AnimationEvent<HTMLLIElement>): void;
}

export function ToastView(props: ToastViewProps) {
  const {
    onOpenChange,
    sortToasts,
    onAnimationEnd,
    toastElementsMapRef,
    toast,
    id,
    ...toastProps
  } = props;
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
      className={cn([
        "[--viewport-padding:_16px]",
        "[&[data-swipe-direction=right][data-state=open]]:border",
        "absolute",
        "bottom-4",
        "right-4",
        "left-4",
        "transition-[transform]",
        "duration-100",
        "rounded-lg",
        "focus-visible:shadow-[0_0_0_2px_black]",
        "translate-y-[calc(0px-(var(--stack-gap)*var(--index)))]",
        "scale-[calc(1-0.05*var(--index))]",
        "after:content-['']",
        "after:absolute",
        "after:w-full",
        "after:h-full",
        "after:left-0",
        "after:right-0",
        "after:top-full",
        "after:bg-transparent",
        "group-hover/viewport:scale-100",
        "group-hover/viewport:translate-y-[calc(var(--hover-offset-y)-var(--stack-gap)*var(--index))]",
        "data-[hidden=true]:opacity-0",
        "data-[state=open]:animate-[slide-right-in_150ms_ease-in]",
        "data-[state=closed]:animate-[slide-right-out_100ms_ease-out]",
        "data-[state=closed]:scale-100",
        "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
        "data-[swipe=move]:duration-0",
        "data-[swipe=cancel]:translate-x-0",
        "data-[swipe=cancel]:transition-[transform_200ms_ease-out]",
        "data-[swipe=end]:animate-[slide-right-out_100ms_ease-out]",
      ])}
      onOpenChange={onOpenChange}
      onAnimationEndCapture={onAnimationEnd}
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
