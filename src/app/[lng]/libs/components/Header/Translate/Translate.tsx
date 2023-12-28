"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { useMemo } from "react";
import Link from "next/link";

import { ILanguage } from "@/types/globals";
import { languages } from "@/context/i18nSettings";
import { useTranslation } from "@/app/i18n/client";

interface Props extends ILanguage {}

export function Translate(props: Props) {
  const { lng } = props;
  const segments = useSelectedLayoutSegments();
  const { t } = useTranslation(lng);
  const languagesOptions = useMemo(() => {
    return languages.map((language) => {
      return { key: language, label: t(`languages.${language}`) };
    });
  }, [t]);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost">
          <span className="material-symbols-outlined">translate</span>
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        {languagesOptions.map((language) => (
          <Link key={language.key} href={`${language.key}/${segments.join("/")}`}>
            <DropdownMenu.Item>{language.label}</DropdownMenu.Item>
          </Link>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
