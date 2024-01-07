import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

import { ILanguage } from "@/types/globals";
import { TCurrentUser } from "@/gql/graphql";
import { getTranslation } from "@/app/i18n/server";

interface Props extends ILanguage {
  user?: TCurrentUser;
}

export async function Villages(props: Props) {
  const { lng } = props;
  const { t } = await getTranslation(lng);
  return (
    <Card className="w-full">
      <Flex gap="3" justify="between">
        <Heading className="flex items-center gap-2" align="center">
          <span className="material-symbols-outlined">holiday_village</span>
          {t("village.title")}
        </Heading>

        <Link href={"/search?target=players"}>
          <Button>
            <span className="material-symbols-outlined">add</span>
            {t("village.button-text")}
          </Button>
        </Link>
      </Flex>

      <Flex gap="3" pt="6" align="center" direction="column" justify="center">
        <Text className="max-w-[60%]" align="center">
          {t("village.empty")}
        </Text>
      </Flex>
    </Card>
  );
}
