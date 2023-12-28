"use client";

import { createContext, useContext } from "react";

import { IToastProps } from "../interfaces/toast.interface";

export interface IToastContext {
  (toast: IToastProps): void;

  message(toast: IToastProps): void;

  success(toast: IToastProps): void;

  warning(toast: IToastProps): void;

  error(toast: IToastProps): void;
}

export const ToastContext = createContext<IToastContext>(
  Object.assign(() => null, {
    message: () => null,
    success: () => null,
    warning: () => null,
    error: () => null,
  }),
);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (context) return context;
  throw new Error("useToast must be used within Toasts");
};
