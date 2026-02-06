import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

type DatabaseClient = ReturnType<typeof drizzle>;

const databaseUrl = process.env.DATABASE_URL;

const createUnconfiguredDatabase = (): DatabaseClient =>
  new Proxy(
    {},
    {
      get() {
        return () => {
          throw new Error(
            "Database is not configured. Set DATABASE_URL to enable DB features.",
          );
        };
      },
    },
  ) as DatabaseClient;

const db: DatabaseClient = databaseUrl
  ? drizzle(
      postgres(databaseUrl, {
        prepare: false,
      }),
    )
  : createUnconfiguredDatabase();

export const isDatabaseConfigured = Boolean(databaseUrl);

export default db;
