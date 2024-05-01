import { z } from "zod";

import { createTRPCRouter, isEvaluator, t } from "../trpc";

export const applicationSubmissionEvaluationRouter = createTRPCRouter({
  // A procedure for creating or updating an evaluation for a submission
  upsertApplicationSubmissionEvaluation: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        applicationSubmissionId: z.string(),
      }),
    )
    .use(isEvaluator)
    .query(async ({ ctx, input }) => {
      const { applicationSubmissionId } = input;

      return ctx.prisma.applicationSubmissionEvaluation.upsert({
        where: {
          applicationSubmissionId,
        },
        create: {
          applicationSubmissionId,
        },
        update: {
          updatedAt: new Date(),
        },
        include: {
          comments: true,
        },
      });
    }),
});
