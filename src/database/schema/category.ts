import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { categoryToPost } from '.';

export const category = pgTable('Category', {
  categoryId: uuid('categoryId').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  categoryToPost: many(categoryToPost),
}));
