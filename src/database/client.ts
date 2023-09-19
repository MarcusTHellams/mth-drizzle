import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { type Client as ClientType, Client } from 'pg';

import * as schema from './schema';

let db: NodePgDatabase<typeof schema>;
export const client = (() => {
  let client: ClientType;

  return {
    getDb: async () => {
      if (!client) {
        client = new Client({
          connectionString: process.env.DATABASE_URL,
        });
        await client.connect();
      }
      if (!db) {
        const db = drizzle(client, { schema, logger: true });
        return db;
      }
      return db;
    },
  };
})();
