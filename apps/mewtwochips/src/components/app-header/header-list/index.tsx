import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/navigation-menu";
import Link from "next/link";

interface Items {
  name: string;
  href: string;
}

interface Props {
  title: string;
  href: string;
  items: Items[];
}

export function HeaderList({ title, href, items }: Props) {
  if (items.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul>
            {items.map((item, index) => {
              return (
                <li key={index}>
                  <NavigationMenuLink asChild>
                    <Link href={item.href}>
                      <div className="text-sm leading-none font-medium">{item.name}</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  } else {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href={href}>{title}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }
}
