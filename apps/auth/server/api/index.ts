import { toNodeHandler } from "better-auth/node";
import express, { Router } from "express";

import { auth } from "@/lib/auth";
import { oidcRouter } from "@/server/api/oidc";

const apiRouter: Router = express.Router();

apiRouter.all("/auth/*splat", toNodeHandler(auth));

apiRouter.use("/oidc", oidcRouter);

export { apiRouter };
