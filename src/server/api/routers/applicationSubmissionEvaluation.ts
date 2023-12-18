import { z } from "zod";

import { createTRPCRouter, isEvaluator, protectedProcedure, t } from "../trpc";

export const applicationSubmissionEvaluationRouter = createTRPCRouter({
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
