"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface IBackRouteProps {
  href: string;
  children?: ReactNode;
}

export default function BackRoute({ href, children }: IBackRouteProps) {
  return null;
  // return (
  //   <Link href={href}>
  //     {children ?? (
  //       <IconButton aria-label="back route" size="large" color="primary">
  //         <ArrowBackIcon/>
  //       </IconButton>
  //     )}
  //   </Link>
  // );
}
