import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

interface IProps {
  size?: number;
  loading: boolean;
  children?: ReactNode;
}

export function Loading(props: IProps) {
  const { loading, size = 16, children } = props;

  if (loading) {
    return <LoaderCircle className="animate-spin" size={size} />;
  } else {
    return children;
  }
}
