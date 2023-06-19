import { createTRPCRouter } from "~/server/api/trpc";
import { clubRouter } from "./routers/club";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  clubRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
