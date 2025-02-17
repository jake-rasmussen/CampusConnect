import { createTRPCRouter } from "~/server/api/trpc";
import { applicationRouter } from "./routers/application";
import { applicationQuestionRouter } from "./routers/applicationQuestion";
import { applicationSubmissionRouter } from "./routers/applicationSubmission";
import { applicationSubmissionAnswerRouter } from "./routers/applicationSubmissionAnswer";
import { applicationSubmissionCommentRouter } from "./routers/applicationSubmissionComment";
import { applicationSubmissionEvaluationRouter } from "./routers/applicationSubmissionEvaluation";
import { colorsRouter } from "./routers/colors";
import { contactInfoRouter } from "./routers/contactInfo";
import { eventRouter } from "./routers/event";
import { memberRouter } from "./routers/member";
import { profileRouter } from "./routers/profile";
import { projectRouter } from "./routers/project";
import { socialMediaRouter } from "./routers/socialMedia";
import { supabaseRouter } from "./routers/supabase";
import { usersRouter } from "./routers/users";
import { schoolAdminRouter } from "./routers/schoolAdmin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  projectRouter,
  eventRouter,
  contactInfoRouter,
  applicationRouter,
  socialMediaRouter,
  memberRouter,
  applicationQuestionRouter,
  applicationSubmissionRouter,
  applicationSubmissionAnswerRouter,
  usersRouter,
  profileRouter,
  applicationSubmissionEvaluationRouter,
  applicationSubmissionCommentRouter,
  colorsRouter,
  supabaseRouter,
  schoolAdminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
