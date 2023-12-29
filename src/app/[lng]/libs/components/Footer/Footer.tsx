"use client";

import { Em, Link, Strong, Text } from "@radix-ui/themes";
import { Trans } from "react-i18next";

import { ILanguage } from "@/types/globals";
import { useTranslation } from "@/app/i18n/client";

interface Props extends ILanguage {}

export function Footer(props: Props) {
  const { lng } = props;
  const { t } = useTranslation(lng);
  return (
    <footer className="w-full">
      <div className="container mx-auto px-4">
        <Text as="p" align="center">
          <Trans i18nKey="fan-content-policy" t={t}>
            此非官方作品，未获得<Strong>Supercell</Strong>认可。更多信息，请参阅
            <Strong>Supercell</Strong> 玩家内容条款：
          </Trans>
          <Link target="_blank" href={`https://www.supercell.com/en/fan-content-policy`}>
            www.supercell.com/en/fan-content-policy
          </Link>
        </Text>

        <Text as="p" align="center">
          {t("our-website")} <Em>mewtwochips.vercel.app</Em> <Strong>Copyright</Strong> © 2023-
          {new Date().getFullYear()}
        </Text>
      </div>
    </footer>
  );
}
