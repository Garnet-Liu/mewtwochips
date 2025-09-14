import { fromNodeHeaders } from "better-auth/node";
import express, { Router } from "express";

import { auth } from "@/lib/auth";

const ssoRouter: Router = express.Router();

ssoRouter.get("/sign-in", async (req, res) => {
  const callbackURL = req.query.callbackURL as string;
  res.redirect(`${process.env.BETTER_AUTH_URL}/authorize?url=${encodeURIComponent(callbackURL)}`);
});

ssoRouter.get("/get-session", async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  res.send(session ?? {});
});

ssoRouter.get("/get-session-token", async (req, res) => {
  const sessionToken = req.cookies["vuer-auth.session_token"];

  res.send({ token: sessionToken });
});

export { ssoRouter };
