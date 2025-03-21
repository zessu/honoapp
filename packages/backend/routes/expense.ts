import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, sum } from "drizzle-orm";
import { randomUUIDv7 } from "bun";

import { auth } from "../auth";
import { db } from "../src/db";
import { expensesTable } from "../src/db/schema";

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
  .get(
    "/totalExpenses/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id: userId } = c.req.valid("param");
      const res = await db
        .select({ count: sum(expensesTable.amount) })
        .from(expensesTable)
        .where(eq(expensesTable.userId, userId))
        .limit(1);
      return c.json(res[0]?.count ?? 0);
    }
  )
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
