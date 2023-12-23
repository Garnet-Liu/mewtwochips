export interface IToast {
  open: boolean;
  duration: number;
  description: string;
  status: EToastStatus;
  type: "foreground" | "background";
}

export enum EToastStatus {
  MESSAGE = "message",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}
