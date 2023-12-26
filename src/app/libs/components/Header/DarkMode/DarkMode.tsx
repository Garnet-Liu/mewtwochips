"use client";

import { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { useTheme } from "next-themes";

enum EThemeMode {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

export function DarkMode() {
  const [mounted, setMounted] = useState(false);
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
        <Select.Item value={EThemeMode.SYSTEM}>System</Select.Item>
        <Select.Item value={EThemeMode.LIGHT}>Light</Select.Item>
        <Select.Item value={EThemeMode.DARK}>Dark</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
