import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import cn from "classnames";

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
}

export default function Button({ children, className, ...btnProps }: IButtonProps) {
  const names = [
    "cursor-pointer",
    "inline-flex",
    "items-center",
    "px-4",
    "py-2",
    "font-semibold",
    "leading-6",
    "text-sm",
    "shadow",
    "rounded-md",
    "text-white",
    "bg-indigo-500",
    "hover:bg-indigo-400",
    "transition",
    "ease-in-out",
    "duration-150"
  ];
  return (
    <button {...btnProps} className={cn(names, className)}>{children}</button>
  );
};
