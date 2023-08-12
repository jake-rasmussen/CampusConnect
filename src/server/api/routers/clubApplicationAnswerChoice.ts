import { ClubApplicationQuestionType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// TODO: if application is live make sure you cannot make edits to it

export const clubApplicationAnswerRouter = createTRPCRouter({
  createClubApplicationAnswerChoice: protectedProcedure
    .input(
      z.object({
        answerChoice: z.string(),
        clubApplicationQuestionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { answerChoice, clubApplicationQuestionId } = input;

      const clubApplicationAnswer =
        await ctx.prisma.clubApplicationAnswerChoice.create({
          data: {
            answerChoice,
            clubApplicationQuestionId,
          },
        });

      return clubApplicationAnswer;
    }),
  updateClubApplicationAnswerChoiceById: protectedProcedure
    .input(
      z.object({
        clubApplicationAnswerId: z.string(),
        answerChoice: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationAnswerId, answerChoice } = input;

      const clubApplicationAnswer =
        await ctx.prisma.clubApplicationAnswerChoice.update({
          where: {
            id: clubApplicationAnswerId,
          },
          data: {
            answerChoice,
          },
        });
    }),
  deleteClubApplicationAnswerChoiceById: protectedProcedure
    .input(
      z.object({
        clubApplicationAnswerId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationAnswerId } = input;

      const clubApplicationAnswer =
        await ctx.prisma.clubApplicationAnswerChoice.delete({
          where: {
            id: clubApplicationAnswerId,
          },
        });
    }),
});
