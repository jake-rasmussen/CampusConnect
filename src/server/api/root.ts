import { createTRPCRouter } from "~/server/api/trpc";
import { clubRouter } from "./routers/club";
import { clubContactInfoRouter } from "./routers/clubContactInfo";
import { clubEventsRouter } from "./routers/clubEvents";
import { clubMemberRouter } from "./routers/clubMember";
import { clubProfileRouter } from "./routers/clubProfile";
import { clubSocialMediaRouter } from "./routers/clubSocialMedia";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  clubRouter,
  clubProfileRouter,
  clubEventsRouter,
  clubContactInfoRouter,
  clubSocialMediaRouter,
  clubMemberRouter,
  usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
