import { toNodeHandler } from "better-auth/node";
import express, { Router } from "express";

import { auth } from "@/lib/auth";
import { ssoRouter } from "@/server/api/sso";

const apiRouter: Router = express.Router();

apiRouter.all("/auth/*splat", toNodeHandler(auth));

apiRouter.use("/sso", ssoRouter);

export { apiRouter };
