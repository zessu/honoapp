import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { auth } from "../auth";

const expenseSchema = z.object({
  amount: z.number(),
  description: z.string().min(10),
  content: z.number(),
  name: z.string().min(3),
});

// TODO: show all expenses for a certain user
// TODO: create a new expense
// TODO: grab total expenses for a certain user

export const expense = new Hono()
  .get("/", async (c) => {
    return c.text("Here are your expenses");
  })
  .get("/totalExpenses", async (c) => {
    return c.json({ amount: 10000 });
  })
  .post("/newExpense", zValidator("json", expenseSchema), async (c) => {
    const data = c.req.valid("json");
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    console.log(session?.user);
    return c.json(data);
  });
