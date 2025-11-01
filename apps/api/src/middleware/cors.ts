import { cors } from "hono/cors";
import type { Context, Next } from "hono";
import { CORS_ORIGINS } from "../lib/constants";

// Allow CORS from local dev and production frontend
export const corsMiddleware = async (c: Context, next: Next) => {
  const frontendUrl = c.env?.FRONTEND_URL as string | undefined;

  const allowedOrigins = [CORS_ORIGINS.LOCAL_DEV, frontendUrl].filter(
    Boolean
  ) as string[];

  return cors({
    origin: allowedOrigins,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })(c, next);
};
