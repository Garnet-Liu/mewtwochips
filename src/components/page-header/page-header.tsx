import { BackRoute } from "./BackRoute/BackRoute";

interface IPageHeaderProps {
  pageTitle: string;
  backRoute: string;
}

export function PageHeader({ pageTitle, backRoute }: IPageHeaderProps) {
  return (
    <div className="relative flex items-center gap-3">
      <BackRoute href={backRoute} />

      <div className="flex-1">{pageTitle}</div>
    </div>
  );
}
