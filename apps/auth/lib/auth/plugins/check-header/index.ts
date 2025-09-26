import type { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";
import { createAuthMiddleware } from "better-auth/plugins";

export const checkHeaderServer = () => {
  return {
    id: "check-header",
    endpoints: {
      getHelloWorld: createAuthEndpoint("/check-header", { method: "GET" }, async (ctx) => {
        console.log("================= check header endpoint =================");
        console.log(ctx);
        return ctx.json({
          message: "Hello World",
        });
      }),
    },
    hooks: {
      before: [
        {
          matcher: (context) => {
            return context.headers?.get("x-my-header") === "my-value";
          },
          handler: createAuthMiddleware(async (ctx) => {
            //do something before the request
            return {
              context: ctx, // if you want to modify the context
            };
          }),
        },
      ],
      after: [
        {
          matcher: (context) => {
            return context.path === "/get-session";
          },
          handler: createAuthMiddleware(async (ctx) => {
            console.log("================= check header hooks after =================");
            // console.log(ctx.context.returned);
            // console.log(ctx.context.responseHeaders);
            const jwt = ctx.context.responseHeaders?.get("set-auth-jwt");
            console.log(jwt);
            // if (ctx.context.returned?.session) {
            //   ctx.context.returned.session.jwt = jwt;
            // }
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
};
