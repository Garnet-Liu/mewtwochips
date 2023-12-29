"use client";

import { signIn } from "next-auth/react";
import { Button } from "@radix-ui/themes";
import { CommonProviderOptions } from "@auth/core/providers";

interface Props {
  provider: CommonProviderOptions;
}

export function LoginButton(props: Props) {
  const { provider } = props;

  const handlePopupCenter = (url: string, title: string) => {
    const windowWidth = 450; // 窗口宽度
    const windowHeight = 556; // 窗口高度

    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
    const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - windowWidth) / 2 / systemZoom + dualScreenLeft;
    const top = (height - windowHeight) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${windowWidth},height=${windowHeight},top=${top},left=${left}`,
    );

    newWindow?.focus();
  };

  const handleSignIn = () => {
    if (provider.name == "google") {
      return handlePopupCenter("/auth/sign-in-google", provider.name);
    } else {
      return signIn(provider.name);
    }
  };

  return (
    <Button size="4" onClick={handleSignIn}>
      <span className="material-symbols-outlined">login</span>
      {provider.name}
    </Button>
  );
}
