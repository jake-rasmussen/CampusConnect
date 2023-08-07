import { createTRPCRouter } from "~/server/api/trpc";
import { clubRouter } from "./routers/club";
import { clubApplicationRouter } from "./routers/clubApplication";
import { clubApplicationQuestionRouter } from "./routers/clubApplicationQuestion";
import { clubContactInfoRouter } from "./routers/clubContactInfo";
import { clubEventsRouter } from "./routers/clubEvents";
import { clubMemberRouter } from "./routers/clubMember";
import { clubSocialMediaRouter } from "./routers/clubSocialMedia";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  clubRouter,
  clubEventsRouter,
  clubContactInfoRouter,
  clubSocialMediaRouter,
  clubMemberRouter,
  clubApplicationRouter,
  clubApplicationQuestionRouter,
  usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
