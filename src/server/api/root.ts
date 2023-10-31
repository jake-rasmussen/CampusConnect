import { createTRPCRouter } from "~/server/api/trpc";
import { clubRouter } from "./routers/club";
import { clubApplicationRouter } from "./routers/clubApplication";
import { clubApplicationQuestionRouter } from "./routers/clubApplicationQuestion";
import { clubApplicationSubmissionRouter } from "./routers/clubApplicationSubmission";
import { clubApplicationSubmissionAnswerRouter } from "./routers/clubApplicationSubmissionAnswer";
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
  clubApplicationRouter,
  clubSocialMediaRouter,
  clubMemberRouter,
  clubApplicationQuestionRouter,
  clubApplicationSubmissionRouter,
  clubApplicationSubmissionAnswerRouter,
  usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
