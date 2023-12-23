export interface IToast {
  open: boolean;
  duration: number;
  description: string;
  status: EToastStatus;
  type: "foreground" | "background";
}

export type IToastProps = Partial<Omit<IToast, "description">> & Pick<IToast, "description">;

export enum EToastStatus {
  MESSAGE = "message",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}
