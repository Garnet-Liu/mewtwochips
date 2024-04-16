"use client";

import { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { useTheme } from "next-themes";

import { ILanguage } from "@/types/globals";
import { useTranslation } from "@/app/i18n/client";

export enum EThemeMode {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

interface Props extends ILanguage {}

export function DarkMode(props: Props) {
  const { lng } = props;
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation(lng);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSelectMode = (mode: string) => {
    setTheme(mode);
  };

  return (
    <Select.Root defaultValue={theme} onValueChange={handleSelectMode}>
      <Select.Trigger />
      <Select.Content>
        <Select.Item value={EThemeMode.SYSTEM}>{t("theme.system")}</Select.Item>
        <Select.Item value={EThemeMode.LIGHT}>{t("theme.light")}</Select.Item>
        <Select.Item value={EThemeMode.DARK}>{t("theme.dark")}</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
