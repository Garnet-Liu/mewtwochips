"use client";

import { ReactNode, RefObject, useCallback, useMemo, useRef, useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

import { cn } from "@/context/cn";
import { ToastContext } from "../hooks/useToastContext";
import { ToastView } from "@/app/toast/Toast/ToastView/ToastView";
import { EToastStatus, IToast } from "@/app/toast/Toast/interfaces/toast.interface";

interface ToastProps {
  children: ReactNode;
}

export const ToastsWrapper = (props: ToastProps) => {
  const { children, ...other } = props;

  const [toasts, setToasts] = useState<Map<string, IToast>>(new Map());
  const toastElementsMapRef = useRef<Map<string, RefObject<HTMLLIElement>>>(new Map());

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
    (payload: Partial<IToast>) => handleAddToast({ status: EToastStatus.MESSAGE, ...payload }),
    [handleAddToast],
  );

  const handleDispatchMessage = useCallback(
    (payload: Partial<IToast>) => handleAddToast({ ...payload, status: EToastStatus.MESSAGE }),
    [handleAddToast],
  );

  const handleDispatchSuccess = useCallback(
    (payload: Partial<IToast>) => handleAddToast({ ...payload, status: EToastStatus.SUCCESS }),
    [handleAddToast],
  );

  const handleDispatchWarning = useCallback(
    (payload: Partial<IToast>) => handleAddToast({ ...payload, status: EToastStatus.WARNING }),
    [handleAddToast],
  );

  const handleDispatchError = useCallback(
    (payload: Partial<IToast>) => handleAddToast({ ...payload, status: EToastStatus.ERROR }),
    [handleAddToast],
  );

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
      <ToastPrimitive.Provider {...other} duration={100000}>
        {children}
        {Array.from(toasts).map(([key, toast]) => (
          <ToastView
            key={key}
            id={key}
            toast={toast}
            sortToasts={sortToasts}
            toastElementsMapRef={toastElementsMapRef}
            onAnimationEnd={(e) => {
              if (e.animationName === "slide-right-out") {
                console.log("animationName", e.animationName);
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
        <ToastPrimitive.Viewport
          className={cn([
            "[--stack-gap:_10px]",
            "group/viewport",
            "fixed",
            "bottom-0",
            "right-0",
            "z-[2147483647]",
            "w-[390px]",
            "list-none",
            "outline-none",
          ])}
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};
