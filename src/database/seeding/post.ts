import { randNumber, randPost } from '@ngneat/falso';

import { client } from '../client';
import { categoryToPost, post } from '../schema';

function getRandomIndex(arr: unknown[]) {
  return Math.floor(Math.random() * arr.length);
}

export const postSeed = async () => {
  const db = await client.getDb();
  await db.transaction(async (tx) => {
    const users = await tx.query.user.findMany();
    await Promise.all(
      new Array(100).fill(1).map(async () => {
        const [newPost] = await tx
          .insert(post)
          .values({
            title: randPost().title,
            authorId: users[getRandomIndex(users)].userId,
            content: randPost().body,
          })
          .returning();
        const arr = new Array(randNumber({ max: 5 })).fill(1);
        const categories = await tx.query.category.findMany();

        await tx.insert(categoryToPost).values({
          categoryId: categories[getRandomIndex(categories)].categoryId,
          postId: newPost.postId,
        });
      })
    );
  });
};
