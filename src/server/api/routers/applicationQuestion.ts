import { ApplicationQuestionType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, isAdmin, t } from "../trpc";

export const applicationQuestionRouter = createTRPCRouter({
  // Define a procedure to create an application question
  createApplicationQuestion: t.procedure
    .input(
      z.object({
        applicationId: z.string(),
        required: z.boolean(),
        orderNumber: z.number(),
        question: z.string(),
        answerChoices: z.array(z.string()),
        type: z.enum([
          // Enum specifying the type of question
          ApplicationQuestionType.FILE_UPLOAD,
          ApplicationQuestionType.MULTIPLE_CHOICE,
          ApplicationQuestionType.MULTIPLE_SELECT,
          ApplicationQuestionType.TEXT_FIELD,
          ApplicationQuestionType.TEXT_INPUT,
        ]),
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
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

  // Define a procedure to delete application questions based on application ID
  deleteAllApplicationQuestionsByApplicationId: t.procedure
    .input(
      z.object({
        applicationId: z.string(),
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { applicationId } = input;

      await ctx.prisma.applicationQuestion.deleteMany({
        where: {
          applicationId,
        },
      });
    }),
});
