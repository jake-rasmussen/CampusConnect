import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const applicationSubmissionAnswerRouter = createTRPCRouter({
  createApplicationSubmissionAnswer: protectedProcedure
    .input(
      z.object({
        applicationSubmissionId: z.string(),
        applicationQuestionId: z.string(),
        answer: z.union([z.array(z.string()), z.string()]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationSubmissionId, applicationQuestionId, answer } = input;

      await ctx.prisma.applicationSubmissionAnswer.create({
        data: {
          applicationSubmissionId,
          applicationQuestionId,
          answer,
        },
      });
    }),
  deleteAllApplicationSubmissionAnswersByApplicationSubmissionId:
    protectedProcedure
      .input(
        z.object({
          applicationSubmissionId: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { applicationSubmissionId } = input;

        await ctx.prisma.applicationSubmissionAnswer.deleteMany({
          where: {
            applicationSubmissionId,
          },
        });
      }),
});
