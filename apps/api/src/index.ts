import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors";
import { quizRouter } from "./routes/quiz";

const app = new Hono();

app.use("/*", corsMiddleware);

app.route("/", quizRouter);

export default app;
