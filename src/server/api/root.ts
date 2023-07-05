import { createTRPCRouter } from "~/server/api/trpc";
import { clubRouter } from "./routers/club";
import { clubContactInfoRouter } from "./routers/clubContactInfo";
import { clubEventsRouter } from "./routers/clubEvents";
import { clubProfileRouter } from "./routers/clubProfile";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

/**
 * TODO:
 *  - return ClubEvents in ascending order
 *  - on user side, display only events that are still available
 *    - on admin side should still display all events
 *
 *  - alphabetical order for contact information as well
 */

export const appRouter = createTRPCRouter({
  clubRouter,
  clubProfileRouter,
  clubEventsRouter,
  clubContactInfoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
