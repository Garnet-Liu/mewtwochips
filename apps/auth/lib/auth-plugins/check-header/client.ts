import { BetterAuthClientPlugin } from "better-auth";

import { checkHeaderServer } from "@/lib/auth-plugins";

export const checkHeaderClient = () => {
  return {
    id: "check-header",
    $InferServerPlugin: {} as ReturnType<typeof checkHeaderServer>,
  } satisfies BetterAuthClientPlugin;
};
