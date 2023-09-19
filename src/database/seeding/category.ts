import { randProductCategory } from '@ngneat/falso';

import { client } from '../client';
import { category } from '../schema';

export const categorySeed = async () => {
  const db = await client.getDb();
  const categories = await db.transaction(async (tx) => {
    return await Promise.all(
      new Array(50).fill(1).map(() => {
        return tx
          .insert(category)
          .values({
            name: randProductCategory(),
          })
          .onConflictDoNothing()
          .returning();
      })
    );
  });
  return categories;
};
