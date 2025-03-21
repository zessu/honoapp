import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
import { user } from "../../auth-schema";

export const expensesTable = pgTable("expenses", {
  id: text("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  content: integer().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id),
});
