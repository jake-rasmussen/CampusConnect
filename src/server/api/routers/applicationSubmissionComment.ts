import { z } from "zod";

import { createTRPCRouter, isEvaluator, protectedProcedure, t } from "../trpc";

export const applicationSubmissionCommentRouter = createTRPCRouter({
  createApplicationSubmissionComment: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        applicationSubmissionEvaluationId: z.string(),
        comment: z.string(),
      }),
    )
    .use(isEvaluator)
    .mutation(async ({ ctx, input }) => {
      const { applicationSubmissionEvaluationId, comment } = input;

      return ctx.prisma.applicationSubmissionComment.create({
        data: {
          comment,
          evaluatorName: ctx.user.firstName + " " + ctx.user.lastName,
          applicationSubmissionEvaluationId,
        },
      });
    }),
});
