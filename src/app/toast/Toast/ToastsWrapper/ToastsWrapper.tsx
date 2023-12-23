"use client";

import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { ToastProviderProps } from "@radix-ui/react-toast";
import * as ToastPrimitive from "@radix-ui/react-toast";

import { ToastContext } from "../hooks/useToastContext";
import { ToastView } from "@/app/toast/Toast/ToastView/ToastView";
import { useToastCommon } from "@/app/toast/Toast/hooks/useToastCommon";
import { EToastStatus, IToast, IToastProps } from "@/app/toast/Toast/interfaces/toast.interface";

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

// type ToastsWrapperVariantsType<T extends Record<string, any>> = T extends { vertical?: infer V; horizontal?: infer H }
//   ? V extends undefined | null
//     ? { vertical?: V; horizontal?: H extends undefined | null ? H : never }
//     : H extends undefined | null
//       ? { vertical?: V extends undefined | null ? V : never; horizontal?: H }
//       : V extends "center"
//         ? { vertical: V; horizontal: H extends "center" ? never : H }
//         : H extends "center"
//           ? { vertical: V extends "center" ? never : V; horizontal: H }
//           : T
//   : T;

type CheckCenter<T, F extends keyof T, S extends keyof T, CK> = T extends {
  [p in F]?: infer FV;
} & { [p in S]?: infer SV }
  ? FV extends CK
    ? { [p in S]?: Exclude<SV, CK> } & Omit<T, S>
    : SV extends CK
      ? { [p in F]?: Exclude<FV, CK> } & Omit<T, F>
      : T
  : never;

type CheckSwipe<T> = T extends {
  vertical?: infer V;
  horizontal?: infer H;
  swipeDirection?: infer D;
}
  ? D extends "up"
    ? { vertical: Exclude<V, "down"> } & Omit<T, "vertical">
    : D extends "down"
      ? { vertical: Exclude<V, "up"> } & Omit<T, "vertical">
      : D extends "left"
        ? { horizontal: Exclude<H, "right"> } & Omit<T, "horizontal">
        : D extends "right"
          ? { horizontal: Exclude<H, "left"> } & Omit<T, "horizontal">
          : T
  : never;

// type Test1 = VariantProps<typeof toastsWrapperVariants>;
//
// type Test3 = CheckCenter<
//   VariantProps<typeof toastsWrapperVariants>,
//   "vertical",
//   "horizontal",
//   "center"
// > & { swipeDirection: SwipeDirection };
//
// type Test4 = {
//   swipeDirection: SwipeDirection;
//   vertical: "center" | "up" | "down" | null | undefined;
//   horizontal: "center" | "left" | "right" | null | undefined;
// };
//
// type Test5 = CheckCenter<Test4, "vertical", "horizontal", "center">;
//
// const t1: Test3 = {
//   vertical: "center",
//   horizontal: "center",
// };
//
// const t2: Test5 = {
//   vertical: "center",
//   horizontal: "center",
// };
//
// const t12: CheckSwipe<Test3> = {
//   vertical: "up",
//   horizontal: "left",
//   swipeDirection: "left",
// };
//
// const t22: CheckSwipe<Test5> = {
//   vertical: "down",
//   horizontal: "center",
//   swipeDirection: "up",
// };

type ToastProps = CheckSwipe<
  ToastProviderProps &
    CheckCenter<VariantProps<typeof toastsWrapperVariants>, "vertical", "horizontal", "center">
>;

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
      toast.current?.setAttribute("data-front", (index === 0).toString());
      toast.current?.setAttribute("data-hidden", (index > 2).toString());
      toast.current?.style.setProperty("--index", index.toString());
      toast.current?.style.setProperty("--height", `${height}px`);
      toast.current?.style.setProperty("--front-height", `${frontToastHeight}px`);
      const hoverOffsetY = heights.slice(0, index).reduce((res, next) => res + next, 0);
      toast.current?.style.setProperty("--hover-offset-y", `-${hoverOffsetY}px`);
    });
  }, []);

  const handleAddToast = useCallback((toast: Partial<IToast>) => {
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts);
      newMap.set(String(Date.now()), {
        open: true,
        type: toast?.type ?? "foreground",
        duration: toast?.duration ?? 3000,
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
        {children}
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
              const outAnimation = [
                "toast-slide-right-out",
                "toast-slide-left-out",
                "toast-slide-down-out",
                "toast-slide-up-out",
              ];
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
    </ToastContext.Provider>
  );
};
