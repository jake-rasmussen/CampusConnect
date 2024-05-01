import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const applicationSubmissionAnswerRouter = createTRPCRouter({
  // Procedure to create an answer for an application submission question
  createApplicationSubmissionAnswer: protectedProcedure
    .input(
      z.object({
        applicationSubmissionId: z.string(),
        applicationQuestionId: z.string(),
        answer: z.union([z.array(z.string()), z.string()]), // Answer content, can be a single string or an array of strings
        // Depends if its a single text input / field or multiple choice or multiple select
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationSubmissionId, applicationQuestionId, answer } = input;

      await ctx.prisma.applicationSubmissionAnswer.create({
        data: {
          applicationSubmissionId,
          applicationQuestionId,
          answer: { answer },
        },
      });
    }),

  // Procedure to delete all answers associated with a specific application submission
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
