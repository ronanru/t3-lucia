import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

import { env } from "~/env.mjs";
import * as schema from "./schema";

export const dbConnection = mysql.createPool({
  uri: env.DATABASE_URL,
});

export const db = drizzle(dbConnection, {
  schema,
  mode: "default",
});
