import { cors } from "hono/cors";
import { CORS_ORIGINS } from "../lib/constants";

export const corsMiddleware = cors({
  origin: [CORS_ORIGINS.LOCAL_DEV],
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type"],
});
