import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

import { ILanguage } from "@/types/globals";
import { CurrentUser } from "@/gql/graphql";
import { getTranslation } from "@/app/i18n/server";

interface Props extends ILanguage {
  user?: CurrentUser;
}

export async function Villages(props: Props) {
  const { lng, user } = props;
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

      {user?.villageTracker?.map((village) => {
        return (
          <Flex key={village?.tag} gap="3" align="center">
            <Text>{village?.name}</Text>
            <Link href={`/village/${village?.tag}`}>
              <Button>
                <span className="material-symbols-outlined">edit</span>
                {t("village.button-edit")}
              </Button>
            </Link>
          </Flex>
        );
      })}

      {!user?.villageTracker?.length ? (
        <Flex gap="3" pt="6" align="center" direction="column" justify="center">
          <Text className="max-w-[60%]" align="center">
            {t("village.empty")}
          </Text>
        </Flex>
      ) : null}
    </Card>
  );
}
