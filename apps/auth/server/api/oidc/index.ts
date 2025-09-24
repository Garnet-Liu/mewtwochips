import { fromNodeHeaders } from "better-auth/node";
import express, { Router } from "express";

import { auth } from "@/lib/auth";
import { authPrisma } from "@/lib/auth-prisma";

const oidcRouter: Router = express.Router();

oidcRouter.get("/client-list", async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  if (!session?.user) {
    return res.status(400).send({ error: "Unauthorized" });
  }

  const oauthApps = await authPrisma.oauthApplication.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc", // 可选：按创建时间排序
    },
  });
  console.log(oauthApps);
  res.send(oauthApps);
});

oidcRouter.get("/get-session", async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  res.send(session ?? {});
});

oidcRouter.get("/get-session-token", async (req, res) => {
  const sessionToken = req.cookies["vuer-auth.session_token"];

  res.send({ token: sessionToken });
});

export { oidcRouter };
