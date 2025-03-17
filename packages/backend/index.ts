import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./auth";
import { expense as expenseRouter } from "./routes/expense";

const app = new Hono();

app
  .use(
    "/api/*",
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  )
  .all("/api/auth/*", (c) => auth.handler(c.req.raw))
  .get("/api", (c) => c.text("Hey from hono!"))
  .route("/api/expenses", expenseRouter)
  .notFound((c) => c.text("The page you are looking for cannot be found"));

export default app;
