"use client";

import {
  AnimationEvent,
  MutableRefObject,
  RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { cva, VariantProps } from "class-variance-authority";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { IconButton } from "@radix-ui/themes";

import { cn } from "@/context/cn";
import { IToast } from "../interfaces/toast.interface";
import { ToastStatusIcon } from "../ToastView/ToastStatusIcon/ToastStatusIcon";

export const toastViewVariants = cva(
  [
    "[--offset-y:0px]", // 在垂直的中间需要偏移50%，但是其他情况不需要
    // "[--direction-y:-1]", // 朝上需要将所有属性变成负数需要*-1，反之亦然
    // "[--direction-x:-1]", // 朝左的时候的边界和朝右的边界不一样，需要*-1，反之亦然
    "[--viewport-padding:16px]",
    "[--y:calc(var(--stack-gap)*var(--index)+var(--offset-y))]",
    "[--x:calc(var(--radix-toast-swipe-move-x,0px)+var(--radix-toast-swipe-end-x,0px))]",
    "[&[data-swipe-direction=right][data-state=close]]:border",
    "absolute",
    "right-4",
    "left-4",
    "transition-[transform,opacity]",
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
    "translate-x-[var(--x)]",
    "translate-y-[calc(var(--y)*var(--direction-y))]",
    "group-hover/viewport:scale-100",
    "data-[hidden=true]:opacity-0",
    "data-[state=closed]:scale-100",
    "data-[swipe=move]:duration-0",
    "group-hover/viewport:[--y:calc(var(--hover-offset-y)+var(--stack-gap)*var(--index)+calc((var(--radix-toast-swipe-end-y,0px)+var(--radix-toast-swipe-move-y,0px))*var(--direction-y))+var(--offset-y))]",
  ],
  {
    variants: {
      vertical: {
        up: ["top-4", "after:bottom-full", "[--direction-y:1]"],
        down: ["bottom-4"],
        center: ["top-1/2", "[--offset-y:50%]"],
      },
      horizontal: {
        left: [],
        right: [],
        center: [],
      },
      swipe: {
        up: ["[--direction-x:1]"],
        down: ["[--direction-x:1]"],
        left: ["[--direction-x:-1]"],
        right: ["[--direction-x:1]"],
      },
    },
    compoundVariants: [
      {
        vertical: ["down", "center"],
        class: ["[--direction-y:-1]", "after:top-full"],
      },
      {
        swipe: ["up", "down"],
        class: [
          "data-[state=open]:animate-[toast-slide-vertical-in_300ms_ease-in]",
          "data-[state=closed]:animate-[toast-slide-vertical-out_200ms_ease-out]",
          "data-[swipe=end]:[--y:calc(var(--hover-offset-y)+var(--stack-gap)*var(--index)+calc((var(--radix-toast-swipe-end-y,0px)-var(--radix-toast-swipe-move-y,0px))*var(--direction-y))+var(--offset-y))]",
          "data-[close=action]:[--y:calc(var(--hover-offset-y)+var(--stack-gap)*var(--index)+calc((var(--radix-toast-swipe-end-y,0px)-var(--radix-toast-swipe-move-y,0px))*var(--direction-y))+var(--offset-y))]",
        ],
      },
      {
        swipe: ["left", "right"],
        class: [
          "data-[state=open]:animate-[toast-slide-horizontal-in_300ms_ease-in]",
          "data-[state=closed]:animate-[toast-slide-horizontal-out_200ms_ease-out]",
          "data-[swipe=end]:[--y:calc(var(--hover-offset-y)+var(--stack-gap)*var(--index)+var(--offset-y))]",
          "data-[close=action]:[--y:calc(var(--hover-offset-y)+var(--stack-gap)*var(--index)+var(--offset-y))]",
        ],
      },
      // right
      {
        swipe: ["right"],
        horizontal: ["right"],
        class: ["[--viewport:calc(100%+var(--viewport-padding))]"],
      },
      {
        swipe: ["right"],
        horizontal: ["left"],
        class: ["[--viewport:calc(100vw-var(--viewport-padding))]"],
      },
      {
        swipe: ["right"],
        horizontal: ["center"],
        class: ["[--viewport:calc(50vw+50%)]"],
      },
      // left
      {
        swipe: ["left"],
        horizontal: ["right"],
        class: ["[--viewport:calc((100vw-var(--viewport-padding))*-1)]"],
      },
      {
        swipe: ["left"],
        horizontal: ["left"],
        class: ["[--viewport:calc(100%+var(--viewport-padding))]"],
      },
      {
        swipe: ["left"],
        horizontal: ["center"],
        class: ["[--viewport:calc(50vw+50%)]"],
      },
      // up
      {
        swipe: ["up"],
        vertical: ["up"],
        class: ["[--viewport:calc(100%+var(--viewport-padding))]"],
      },
      {
        swipe: ["up"],
        vertical: ["down"],
        class: ["[--viewport:calc((100vh-var(--viewport-padding))*-1)]"],
      },
      {
        swipe: ["up"],
        vertical: ["center"],
        class: ["[--viewport:calc((50vh+100%)*-1)]"],
      },
      // down
      {
        swipe: ["down"],
        vertical: ["up"],
        class: ["[--viewport:calc((100vh-var(--viewport-padding))*-1)]"],
      },
      {
        swipe: ["down"],
        vertical: ["down"],
        class: ["[--viewport:calc(100%+var(--viewport-padding))]"],
      },
      {
        swipe: ["down"],
        vertical: ["center"],
        class: ["[--viewport:50vh]"],
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

  const handleClose = useCallback(() => {
    ref.current?.setAttribute("data-close", "action");
  }, []);

  return (
    <ToastPrimitive.Root
      {...toastProps}
      ref={ref}
      open={toast.open}
      type={toast.type}
      duration={toast.duration}
      className={toastViewVariants(toastProps)}
    >
      <div
        className={cn([
          "relative",
          "group/item",
          "bg-white",
          "dark:bg-black",
          "dark:border",
          "dark:border-white/25",
          "p-4",
          "rounded-lg",
          "h-[var(--front-height)]",
          "shadow-[hsl(206_22%_7%/35%)_0_10px_38px_-10px,hsl(206_22%_7%/20%)_0_10px_20px_-15px]",
          "group-hover/viewport:h-auto",
          "flex",
          "gap-2",
          "items-center",
        ])}
        data-status={toast.status}
      >
        {toast.Component ? (
          toast.Component
        ) : (
          <>
            <ToastStatusIcon status={toast.status} />

            <ToastPrimitive.Description className="flex-1 text-xs">
              {toast.title && (
                <ToastPrimitive.Title className="mb-1 text-sm font-medium">
                  <p>Scheduled: Catch up</p>
                </ToastPrimitive.Title>
              )}

              {toast.description}
            </ToastPrimitive.Description>

            <ToastPrimitive.Action
              onClick={handleClose}
              className={cn([
                "inline-flex",
                "items-center",
                "justify-center",
                "rounded",
                "border",
                "border-black/50",
                "dark:border-white/50",
                "px-2",
                "leading-6",
                "h-6",
                "text-xs",
                "dark:border-white/[.15]",
                "leading-6",
                "font-medium",
              ])}
              altText="Goto schedule to undo"
            >
              Undo
            </ToastPrimitive.Action>
          </>
        )}

        <ToastPrimitive.Close
          onClick={handleClose}
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
