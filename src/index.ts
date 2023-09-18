import 'dotenv/config';

import { client } from './database/client';
import { post, user } from './database/schema';

(async () => {
  const db = await client.getDb();
  const posts = await db.query.user.findMany({
    with: {
      profile: true,
    },
  });
  console.log('posts: ', posts);
})();
