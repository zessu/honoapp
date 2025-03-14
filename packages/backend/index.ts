import { Hono } from "hono";
import { expense as expenseRouter } from "./routes/expense";

const app = new Hono();

app
  .get("/api", (c) => c.text("Hey from hono!"))
  .route("/api/expenses", expenseRouter)
  .notFound((c) => c.text("Sorry, cannot find the page you are looking for"));

export default app;
