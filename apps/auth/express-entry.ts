import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

import { createServer } from "./server/create-server";

async function startServer() {
  dotenvExpand.expand(dotenv.config());

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3060;

  const app = await createServer();

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  return app;
}

export default (await startServer()) as unknown;
