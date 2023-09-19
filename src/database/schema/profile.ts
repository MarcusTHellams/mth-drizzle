import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { user } from '.';

export const profile = pgTable('profile', {
  profileId: uuid('profileId').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .references(() => user.userId, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull()
    .unique(),
  bio: text('bio').notNull(),
});

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.userId],
  }),
}));
