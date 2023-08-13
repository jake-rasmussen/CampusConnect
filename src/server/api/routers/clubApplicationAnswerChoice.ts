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

      const clubApplicationAnswerChoice =
        await ctx.prisma.clubApplicationAnswerChoice.create({
          data: {
            answerChoice,
            clubApplicationQuestionId,
          },
        });

      return clubApplicationAnswerChoice;
    }),
  updateClubApplicationAnswerChoiceById: protectedProcedure
    .input(
      z.object({
        clubApplicationAnswerChoiceId: z.string(),
        answerChoice: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationAnswerChoiceId: clubApplicationAnswerId, answerChoice } = input;

      const clubApplicationAnswerChoice =
        await ctx.prisma.clubApplicationAnswerChoice.update({
          where: {
            id: clubApplicationAnswerId,
          },
          data: {
            answerChoice,
          },
        });
      
      return clubApplicationAnswerChoice;
    }),
  deleteClubApplicationAnswerChoiceById: protectedProcedure
    .input(
      z.object({
        clubApplicationAnswerChoiceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationAnswerChoiceId: clubApplicationAnswerChoiceId } = input;

      const clubApplicationAnswerChoice =
        await ctx.prisma.clubApplicationAnswerChoice.delete({
          where: {
            id: clubApplicationAnswerChoiceId,
          },
        });
    }),
});
