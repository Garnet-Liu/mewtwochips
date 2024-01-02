import { ReactNode } from "react";

export interface IToast {
  open: boolean;
  duration: number;
  description: string;
  status: EToastStatus;
  Component?: ReactNode;
  type: "foreground" | "background";
}

type Content<T> = T extends { description: infer D; Component: infer C }
  ? D extends undefined
    ? C extends undefined
      ? never
      : C
    : D
  : T;

export type IToastProps = Partial<Omit<IToast, "description">> & Pick<IToast, "description">;

export enum EToastStatus {
  MESSAGE = "message",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}
