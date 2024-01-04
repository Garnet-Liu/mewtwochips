"use client";

import { BaseError } from "@/components";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError(props: Props) {
  return <BaseError {...props} />;
}
