import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core';

import { post, profile } from '.';

export const roleEnum = pgEnum('role', ['USER', 'ADMIN']);
export const user = pgTable(
  'User',
  {
    userId: uuid('userId').defaultRandom().primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    role: roleEnum('role').default('USER'),
  },
  (table) => ({
    uniq1: unique().on(table.name, table.email),
    uniq2: unique().on(table.name, table.role),
  })
);

export const userRelations = relations(user, ({ many, one }) => ({
  posts: many(post),
  profile: one(profile, {
    fields: [user.userId],
    references: [profile.userId],
  }),
}));
