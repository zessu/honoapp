import { Hono } from "hono";
const app = new Hono();

app.get("/", (c) => c.text("Hey from hono!"));

export default app;
