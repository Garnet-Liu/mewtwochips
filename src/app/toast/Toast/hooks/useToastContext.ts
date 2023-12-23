import { createContext, useContext } from "react";

import { IToast } from "@/app/toast/Toast/interfaces/toast.interface";

export interface IToastContext {
  (toast: Partial<IToast>): void;

  message(toast: Partial<IToast>): void;

  success(toast: Partial<IToast>): void;

  warning(toast: Partial<IToast>): void;

  error(toast: Partial<IToast>): void;
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
