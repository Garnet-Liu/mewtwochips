import { createServer } from "./server/create-server";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3060;

async function startServer() {
  const app = await createServer();

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  return app;
}

export default (await startServer()) as unknown;
