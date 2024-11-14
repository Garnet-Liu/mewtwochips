import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

export interface IProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
  icon: ReactNode;
}

export const ListItem = forwardRef<ElementRef<"a">, IProps>(function ListItem(
  { className, title, icon, children, ...props },
  ref,
) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-1 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
