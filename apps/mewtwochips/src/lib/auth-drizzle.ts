import { drizzle } from "drizzle-orm/node-postgres";

// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    connectionString: process.env.BETTER_DATABASE_URL!,
  },
});

export { db };
