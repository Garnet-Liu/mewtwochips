import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

import { ILanguage } from "@/types/globals";

interface Props extends ILanguage {}

export function Clans(props: Props) {
  const { lng } = props;
  return (
    <Card className="w-full">
      <Heading align="center">你的氏族</Heading>

      <Flex gap="3" pt="6" align="center" direction="column" justify="center">
        <Text>你现在还没有任何氏族</Text>

        <Link href={"/search?target=clans"}>
          <Button>添加氏族</Button>
        </Link>
      </Flex>
    </Card>
  );
}
