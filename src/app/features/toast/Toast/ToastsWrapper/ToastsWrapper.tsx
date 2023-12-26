"use client";

import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import * as ToastPrimitive from "@radix-ui/react-toast";

import { ToastContext } from "../hooks/useToastContext";
import { ToastView } from "@/app/features/toast/Toast/ToastView/ToastView";
import { useToastCommon } from "@/app/features/toast/Toast/hooks/useToastCommon";
import {
  EToastStatus,
  IToast,
  IToastProps,
} from "@/app/features/toast/Toast/interfaces/toast.interface";

export const toastsWrapperVariants = cva(
  ["[--stack-gap:_10px]", "group/viewport", "fixed", "z-[2147483647]", "w-[390px]", "outline-none"],
  {
    variants: {
      vertical: {
        up: ["top-0"],
        down: ["bottom-0"],
        center: ["top-1/2", "translate-y-[-50%]"],
      },
      horizontal: {
        left: ["left-0"],
        right: ["right-0"],
        center: ["left-1/2", "translate-x-[-50%]"],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      vertical: "down",
      horizontal: "right",
    },
  },
);

type CheckCenter<T, F extends keyof T, S extends keyof T, CK> = T extends {
  [p in F]?: infer FV;
} & { [p in S]?: infer SV }
  ? FV extends CK
    ? { [p in S]?: Exclude<SV, CK> } & Omit<T, S>
    : SV extends CK
      ? { [p in F]?: Exclude<FV, CK> } & Omit<T, F>
      : T
  : never;

type ToastProps = ToastPrimitive.ToastProviderProps &
  CheckCenter<VariantProps<typeof toastsWrapperVariants>, "vertical", "horizontal", "center">;

export const ToastsWrapper = (props: ToastProps) => {
  const { children, vertical, horizontal, swipeDirection, ...other } = props;

  const [toasts, setToasts] = useState<Map<string, IToast>>(new Map());
  const toastElementsMapRef = useRef<Map<string, RefObject<HTMLLIElement>>>(new Map());
  const { checkSwipeDirection } = useToastCommon();

  const sortToasts = useCallback(() => {
    const toastElements = Array.from(toastElementsMapRef.current).reverse();
    const heights: number[] = [];

    toastElements.forEach(([_, toast], index) => {
      const height = toast.current?.clientHeight || 0;
      heights.push(height);
      const frontToastHeight = heights[0];
      toast.current?.setAttribute("data-hidden", (index > 2).toString());
      toast.current?.style.setProperty("--index", index.toString());
      toast.current?.style.setProperty("--front-height", `${frontToastHeight}px`);
      const hoverOffsetY = heights.slice(0, index).reduce((res, next) => res + next, 0);
      toast.current?.style.setProperty("--hover-offset-y", `${hoverOffsetY}px`);
    });
  }, []);

  const handleAddToast = useCallback((toast: Partial<IToast>) => {
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts);
      newMap.set(String(Date.now()), {
        open: true,
        type: toast?.type ?? "foreground",
        duration: toast?.duration ?? 6000,
        description: toast?.description ?? "",
        status: toast?.status ?? EToastStatus.MESSAGE,
      });
      return newMap;
    });
  }, []);

  const handleRemoveToast = useCallback((key: string) => {
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const handleDispatchDefault = useCallback(
    (payload: IToastProps) => handleAddToast({ status: EToastStatus.MESSAGE, ...payload }),
    [handleAddToast],
  );

  const handleDispatchMessage = useCallback(
    (payload: IToastProps) => handleAddToast({ ...payload, status: EToastStatus.MESSAGE }),
    [handleAddToast],
  );

  const handleDispatchSuccess = useCallback(
    (payload: IToastProps) => handleAddToast({ ...payload, status: EToastStatus.SUCCESS }),
    [handleAddToast],
  );

  const handleDispatchWarning = useCallback(
    (payload: IToastProps) => handleAddToast({ ...payload, status: EToastStatus.WARNING }),
    [handleAddToast],
  );

  const handleDispatchError = useCallback(
    (payload: IToastProps) => handleAddToast({ ...payload, status: EToastStatus.ERROR }),
    [handleAddToast],
  );

  const swipe = checkSwipeDirection(vertical, horizontal, swipeDirection);
  return (
    <ToastContext.Provider
      value={useMemo(
        () =>
          Object.assign(handleDispatchDefault, {
            message: handleDispatchMessage,
            success: handleDispatchSuccess,
            warning: handleDispatchWarning,
            error: handleDispatchError,
          }),
        [
          handleDispatchDefault,
          handleDispatchMessage,
          handleDispatchSuccess,
          handleDispatchWarning,
          handleDispatchError,
        ],
      )}
    >
      <ToastPrimitive.Provider {...other} swipeDirection={swipe}>
        {Array.from(toasts).map(([key, toast]) => (
          <ToastView
            key={key}
            id={key}
            swipe={swipe}
            toast={toast}
            vertical={vertical}
            horizontal={horizontal}
            sortToasts={sortToasts}
            toastElementsMapRef={toastElementsMapRef}
            onAnimationEndCapture={(e) => {
              const outAnimation = ["toast-slide-horizontal-out", "toast-slide-vertical-out"];
              if (outAnimation.includes(e.animationName)) {
                handleRemoveToast(key);
              }
            }}
            onOpenChange={(open: boolean) => {
              if (!open) {
                toastElementsMapRef.current.delete(key);
                sortToasts();
              }
            }}
          />
        ))}
        <ToastPrimitive.Viewport className={toastsWrapperVariants({ vertical, horizontal })} />
      </ToastPrimitive.Provider>
      {children}
    </ToastContext.Provider>
  );
};
