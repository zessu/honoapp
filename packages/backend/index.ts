import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./auth";
import { expense as expenseRouter } from "./routes/expense";

const app = new Hono();

//TODO: Add middleware to log out user if session is invalid

app
  .use(
    "/api/*",
    cors({
      origin: process.env.LOCAL_DOMAIN as string,
      credentials: true,
    })
  )
  .all("/api/auth/*", (c) => auth.handler(c.req.raw))
  .get("/api", (c) => c.text("Hey from hono!"))
  .route("/api/expenses", expenseRouter)
  .notFound((c) => c.text("The page you are looking for cannot be found"));

export default app;
