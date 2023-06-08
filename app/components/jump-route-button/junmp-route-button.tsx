import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import classnames from "classnames";

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
}

export const Button = ({ children, ...btnProps }: IButtonProps) => {
  const names = [
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
    <button {...btnProps} className={classnames(names)}>{children}</button>
  );
};
