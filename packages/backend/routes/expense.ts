import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string(),
});

export const expense = new Hono()
  .get("/", (c) => c.text("Here are your expenses"))
  .get("/totalExpenses", async (c) => {
    return c.json({ amount: 10000 });
  })
  .get(":id", async (c) => {
    const { id } = c.req.param();
    return c.text(`Your supplied id was ${id}`);
  })
  .post("", zValidator("json", expenseSchema), async (c) => {
    const data = c.req.valid("json");
    return c.text("Expense created");
  });
