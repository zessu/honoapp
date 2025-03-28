import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, sum } from "drizzle-orm";
import { randomUUIDv7 } from "bun";

import { auth } from "../auth";
import { db } from "../src/db";
import { expensesTable } from "../src/db/schema";

//TODO: define this from the database object omiting the unneeded fields.
const expenseSchema = z.object({
  amount: z.number(),
  description: z.string().min(10),
  content: z.number(),
  name: z.string().min(3),
});

export const expense = new Hono()
  .get("/", async (c) => {
    return c.text("Hi");
  })
  .get("/expenses", async (c) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session || !session.user.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const userId = session.user.id;
    const res = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, userId));
    return c.json(res);
  })
  .post("/newExpense", zValidator("json", expenseSchema), async (c) => {
    const data = c.req.valid("json");
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session || !session.user.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const userId = session.user.id;
    const expenseId = randomUUIDv7();
    const res = await db
      .insert(expensesTable)
      .values({ ...data, userId, id: expenseId })
      .returning();
    return c.json(res[0]);
  });
