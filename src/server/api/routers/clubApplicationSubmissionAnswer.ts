import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const clubApplicationSubmissionAnswerRouter = createTRPCRouter({
  createClubApplicationSubmissionAnswer: protectedProcedure
    .input(
      z.object({
        clubApplicationSubmissionId: z.string(),
        clubApplicationQuestionId: z.string(),
        answer: z.union([z.array(z.string()), z.string()]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationSubmissionId, clubApplicationQuestionId, answer } =
        input;

      const target = typeof answer === "string" ? "answer" : "selectedAnswers";

      console.log(
        { clubApplicationSubmissionId, clubApplicationQuestionId, answer },
        target,
      );

      await ctx.prisma.clubApplicationSubmissionAnswer.create({
        data: {
          clubApplicationSubmissionId,
          clubApplicationQuestionId,
          [target]: answer,
        },
      });
    }),
  deleteAllClubApplicationSubmissionAnswersByClubApplicationSubmissionId:
    protectedProcedure
      .input(
        z.object({
          clubApplicationSubmissionId: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { clubApplicationSubmissionId } = input;

        await ctx.prisma.clubApplicationSubmissionAnswer.deleteMany({
          where: {
            clubApplicationSubmissionId,
          },
        });
      }),
});
