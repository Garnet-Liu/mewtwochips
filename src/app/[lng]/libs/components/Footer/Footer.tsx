import { Em, Link, Strong, Text } from "@radix-ui/themes";

export function Footer() {
  return (
    <footer className="w-full">
      <div className="container mx-auto px-4">
        <Text as="p" align="center">
          此非官方作品，未获得<Strong>Supercell</Strong>认可
        </Text>

        <Text as="p" align="center">
          更多信息，请参阅<Strong>Supercell</Strong> 玩家内容条款：{" "}
        </Text>

        <Text as="p" align="center">
          <Link target="_blank" href={"https://www.supercell.com/en/fan-content-policy"}>
            www.supercell.com/en/fan-content-policy
          </Link>
        </Text>

        <Text as="p" align="center">
          我们的网址：<Em>mewtwochips.vercel.app</Em> <Strong>Copyright</Strong> © 2023-
          {new Date().getFullYear()}
        </Text>
      </div>
    </footer>
  );
}
