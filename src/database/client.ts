import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { type Client as ClientType, Client } from 'pg';

import * as schema from './schema';

export const client = (() => {
  let client: ClientType;
  let db: NodePgDatabase<typeof schema>;

  return {
    getDb: async () => {
      if (!client) {
        client = new Client({
          connectionString: process.env.DATABASE_URL,
        });
        await client.connect();
      }
      if (!db) {
        const db = drizzle(client, { schema });
        return db;
      }
      return db;
    },
  };
})();
