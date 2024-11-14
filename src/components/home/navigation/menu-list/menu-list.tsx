import { ListItem, NavigationPage } from "@/components/home/navigation";

interface IProps {
  pages: NavigationPage;
}

export function MenuList(props: IProps) {
  const { pages } = props;
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {pages.children?.map((component) => {
        const Icon = component.Icon;
        return (
          <ListItem
            key={`nav-menu-${component.path}`}
            title={component.label}
            href={component.path}
            icon={<Icon />}
          >
            {component.description}
          </ListItem>
        );
      })}
    </ul>
  );
}
