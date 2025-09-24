import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createDevMiddleware } from "vike";
import { renderPage } from "vike/server";

import { apiRouter } from "@/server/api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;
const hmrPort = process.env.HMR_PORT ? parseInt(process.env.HMR_PORT, 10) : 24680;

export const createServer = async (): Promise<Express> => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  const trustedOrigins = (process.env.BETTER_TRUSTED_ORIGINS ?? "").split(",").filter(Boolean);
  console.log("Trusted Origins:", trustedOrigins);

  app.use(
    cors({
      origin: trustedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    }),
  );

  app.use("/api", apiRouter); // For ExpressJS v5

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(join(root, "../dist/client")));
  } else {
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const viteDevMiddleware = (
      await createDevMiddleware({
        root: join(root, ".."),
        viteConfig: { server: { hmr: { port: hmrPort } } },
      })
    ).devMiddleware;
    app.use(viteDevMiddleware);
  }

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  app.all("{*vike}", async (req, res, next) => {
    const pageContextInit = { urlOriginal: req.originalUrl, headersOriginal: req.headers };
    const pageContext = await renderPage(pageContextInit);

    if (pageContext.httpResponse) {
      const { body, statusCode, headers } = pageContext.httpResponse;
      res.status(statusCode);
      headers?.forEach(([name, value]) => res.setHeader(name, value));
      res.send(body);
    } else {
      next();
    }
  });

  return app;
};
