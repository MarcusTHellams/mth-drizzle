import 'dotenv/config';

import { client } from './database/client';

(async () => {
  const db = await client.getDb();
  const posts = await db.query.user.findMany({
    with: {
      profile: true,
    },
  });
  console.log('posts: ', posts);
})();
