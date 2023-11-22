import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  // server: {
  //   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  //   CLERK_SECRET_KEY: z.string().min(1),
  //   POSTGRES_DATABASE: z.string().min(1),
  //   POSTGRES_PASSWORD: z.string().min(1),
  //   POSTGRES_HOST: z.string().min(1),
  //   POSTGRES_USER: z.string().min(1),
  //   POSTGRES_URL_NON_POOLING: z.string().min(1),
  //   POSTGRES_PRISMA_URL: z.string().min(1),
  //   POSTGRES_URL: z.string().min(1),
  //   NODE_ENV: z.enum(["development", "test", "production"]),
  // },
  server: {
    DATABASE_URL: z.string().url(),
    HOST_PORT: z.string().length(4),
    NODE_ENV: z.enum(["development", "test", "production"]),
    CLERK_SECRET_KEY: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  // runtimeEnv: {
  //   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  //   CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  //   POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  //   POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  //   POSTGRES_HOST: process.env.POSTGRES_HOST,
  //   POSTGRES_USER: process.env.POSTGRES_USER,
  //   POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
  //   POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
  //   POSTGRES_URL: process.env.POSTGRES_URL,
  //   NODE_ENV: process.env.NODE_ENV,
  // },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    HOST_PORT: process.env.HOST_PORT,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
