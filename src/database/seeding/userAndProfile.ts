import {
  randBoolean,
  randEmail,
  randFullName,
  randParagraph,
} from '@ngneat/falso';

import { client } from '../../database/client';
import { profile, user } from '../schema';

export const userAndProfile = async () => {
  const db = await client.getDb();
  await db.transaction((tx) => {
    return Promise.all(
      new Array(20).fill(1).map(async () => {
        const newUser = await tx
          .insert(user)
          .values({
            email: randEmail(),
            name: randFullName(),
            role: randBoolean() ? 'ADMIN' : 'USER',
          })
          .returning();
        await tx.insert(profile).values({
          bio: randParagraph(),
          userId: newUser[0].userId,
        });
        return newUser;
      })
    );
  });
};
