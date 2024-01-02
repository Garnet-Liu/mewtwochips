import { Button } from "@radix-ui/themes";
import Link from "next/link";

export function SignInToast({ close }: { close: () => void }) {
  console.log("close", close);
  return (
    <div className="agp-3 flex w-full items-center">
      <p className="flex-1">这个操作需要先登录</p>

      <Link href={"/auth/sign-up"}>
        <Button onClick={close}>Sign in</Button>
      </Link>
    </div>
  );
}
