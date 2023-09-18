import { relations } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { categoryToPost, user } from '.';

export const post = pgTable('Post', {
  postId: uuid('postId').defaultRandom().primaryKey(),
  title: varchar('email', { length: 255 }).notNull(),
  published: boolean('published').notNull().default(false),
  authorId: uuid('authorId')
    .references(() => user.userId)
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const postRelations = relations(post, ({ many, one }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.userId],
  }),
  categories: many(categoryToPost),
}));
