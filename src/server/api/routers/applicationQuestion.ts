import { ApplicationQuestionType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// TODO: if application is live make sure you cannot make edits to it

export const applicationQuestionRouter = createTRPCRouter({
  createApplicationQuestion: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        required: z.boolean(),
        orderNumber: z.number(),
        question: z.string(),
        answerChoices: z.array(z.string()),
        type: z.enum([
          ApplicationQuestionType.FILE_UPLOAD,
          ApplicationQuestionType.MULTIPLE_CHOICE,
          ApplicationQuestionType.MULTIPLE_SELECT,
          ApplicationQuestionType.TEXT_FIELD,
          ApplicationQuestionType.TEXT_INPUT,
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        applicationId,
        required,
        orderNumber,
        question,
        answerChoices,
        type,
      } = input;

      const applicationQuestion = await ctx.prisma.applicationQuestion.create({
        data: {
          application: {
            connect: {
              id: applicationId,
            },
          },
          required,
          orderNumber,
          question,
          type,
          answerChoices,
        },
      });

      return applicationQuestion;
    }),
  deleteApplicationQuestionByApplicationId: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationId } = input;

      await ctx.prisma.applicationQuestion.deleteMany({
        where: {
          applicationId,
        },
      });
    }),
});
