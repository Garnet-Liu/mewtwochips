import { EToastStatus } from "@/app/features/toast/Toast/interfaces/toast.interface";

interface Props {
  status: EToastStatus;
}

export function ToastStatusIcon({ status }: Props) {
  if (status !== EToastStatus.MESSAGE) {
    return (
      <div className="h-6 w-6 text-xl">
        {status === EToastStatus.SUCCESS && (
          <span className="material-symbols-outlined text-green-600">task_alt</span>
        )}
        {status === EToastStatus.WARNING && (
          <span className="material-symbols-outlined text-yellow-600">warning</span>
        )}
        {status === EToastStatus.ERROR && (
          <span className="material-symbols-outlined text-red-600">error</span>
        )}
      </div>
    );
  } else {
    return null;
  }
}
