import { ClubApplicationQuestionType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// TODO: if application is live make sure you cannot make edits to it

export const clubApplicationQuestionRouter = createTRPCRouter({
  createClubApplicationQuestion: protectedProcedure
    .input(
      z.object({
        clubApplicationId: z.string(),
        required: z.boolean(),
        orderNumber: z.number(),
        question: z.string(),
        clubApplicationAnswerChoices: z.array(z.string()),
        type: z.enum([
          ClubApplicationQuestionType.FILE_UPLOAD,
          ClubApplicationQuestionType.MULTIPLE_CHOICE,
          ClubApplicationQuestionType.MULTIPLE_SELECT,
          ClubApplicationQuestionType.TEXT_FIELD,
          ClubApplicationQuestionType.TEXT_INPUT,
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        clubApplicationId,
        required,
        orderNumber,
        question,
        clubApplicationAnswerChoices,
        type,
      } = input;

      const clubApplicationQuestion =
        await ctx.prisma.clubApplicationQuestion.create({
          data: {
            clubApplication: {
              connect: {
                id: clubApplicationId,
              },
            },
            required,
            orderNumber,
            question,
            type,
            clubApplicationAnswerChoices,
          },
        });

      return clubApplicationQuestion;
    }),
  updateClubApplicationQuestionById: protectedProcedure
    .input(
      z.object({
        clubApplicaitonQuestionId: z.string(),
        required: z.boolean(),
        orderNumber: z.number(),
        question: z.string(),
        type: z.enum([
          ClubApplicationQuestionType.FILE_UPLOAD,
          ClubApplicationQuestionType.MULTIPLE_CHOICE,
          ClubApplicationQuestionType.MULTIPLE_SELECT,
          ClubApplicationQuestionType.TEXT_FIELD,
          ClubApplicationQuestionType.TEXT_INPUT,
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        clubApplicaitonQuestionId,
        required,
        orderNumber,
        question,
        type,
      } = input;

      const clubApplicationQuestion =
        await ctx.prisma.clubApplicationQuestion.update({
          where: {
            id: clubApplicaitonQuestionId,
          },
          data: {
            required,
            orderNumber,
            question,
            type,
          },
        });

      return clubApplicationQuestion;
    }),
  deleteClubApplicationQuestionById: protectedProcedure
    .input(
      z.object({
        clubApplicationQuestionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationQuestionId } = input;

      const clubApplicationQuestions =
        await ctx.prisma.clubApplicationQuestion.delete({
          where: {
            id: clubApplicationQuestionId,
          },
        });

      return clubApplicationQuestions;
    }),
  deleteClubApplicationQuestionByApplicationId: protectedProcedure
    .input(
      z.object({
        clubApplicationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationId } = input;

      await ctx.prisma.clubApplicationQuestion.deleteMany({
        where: {
          clubApplicationId,
        },
      });
    }),
});
