import { ApplicationSubmissionEvaluationGrade } from "@prisma/client";
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
          comments: {
            include: {
              evaluator: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
    }),
  updateApplicationSubmissionEvaluation: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        applicationSubmissionEvaluationId: z.string(),
        evaluation: z.enum([
          ApplicationSubmissionEvaluationGrade.YES,
          ApplicationSubmissionEvaluationGrade.NO,
          ApplicationSubmissionEvaluationGrade.MAYBE,
          ApplicationSubmissionEvaluationGrade.UNGRADED,
        ]),
      }),
    )
    .use(isEvaluator)
    .mutation(async ({ ctx, input }) => {
      const { applicationSubmissionEvaluationId, evaluation } = input;

      return ctx.prisma.applicationSubmissionEvaluation.update({
        where: {
          id: applicationSubmissionEvaluationId,
        },
        data: {
          evaluation,
        },
      });
    }),
});
