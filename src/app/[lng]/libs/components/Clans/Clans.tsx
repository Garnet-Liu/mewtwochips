import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

import { ILanguage } from "@/types/globals";
import { getTranslation } from "@/app/i18n/server";

interface Props extends ILanguage {}

export async function Clans(props: Props) {
  const { lng } = props;
  const { t } = await getTranslation(lng);
  return (
    <Card className="w-full">
      <Flex gap="3" justify="between">
        <Heading className="flex items-center gap-2" align="center">
          <span className="material-symbols-outlined">security</span>
          {t("clans.title")}
        </Heading>

        <Link href={"/search?target=players"}>
          <Button>
            <span className="material-symbols-outlined">add</span>
            {t("clans.button-text")}
          </Button>
        </Link>
      </Flex>

      <Flex gap="3" pt="6" align="center" direction="column" justify="center">
        <Text className="max-w-[60%]" align="center">
          {t("clans.empty")}
        </Text>
      </Flex>
    </Card>
  );
}
