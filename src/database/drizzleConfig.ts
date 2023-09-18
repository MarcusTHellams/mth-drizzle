import { join } from 'path';

export default {
  schema: join(__dirname, './schema/*'),
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};
