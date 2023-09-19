import { relations } from 'drizzle-orm';
import { pgTable, unique, uuid } from 'drizzle-orm/pg-core';

import { category, post } from '.';

export const categoryToPost = pgTable(
  'categoryToPost',
  {
    categoryId: uuid('categoryId')
      .references(() => category.categoryId)
      .notNull(),
    postId: uuid('postId')
      .references(() => post.postId)
      .notNull(),
  },
  (table) => ({
    pk: unique().on(table.categoryId, table.postId),
  })
);

export const categoryToPostRelations = relations(categoryToPost, ({ one }) => ({
  post: one(post, {
    fields: [categoryToPost.postId],
    references: [post.postId],
  }),
  category: one(category, {
    fields: [categoryToPost.categoryId],
    references: [category.categoryId],
  }),
}));
