import { ApplicationStatus, ApplicationSubmissionStatus } from "@prisma/client";
import { z } from "zod";

import { supabase } from "~/server/supabase/supabaseClient";
import { createTRPCRouter, isEvaluator, protectedProcedure, t } from "../trpc";
import { checkIfApplicationPastDeadline } from "./application";
import { supabaseRouter } from "./supabase";

export const applicationSubmissionRouter = createTRPCRouter({
  // Procedure to create or update an application submission
  upsertApplicationSubmission: protectedProcedure
    .input(
      z.object({
        applicationSubmissionId: z.string().optional(),
        applicationId: z.string(),
        status: z.enum([
          ApplicationSubmissionStatus.NEW,
          ApplicationSubmissionStatus.SUBMITTED,
          ApplicationSubmissionStatus.DRAFT,
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationSubmissionId, applicationId, status } = input;
      const userId = ctx.user.userId;

      if (applicationSubmissionId) {
        return await ctx.prisma.applicationSubmission.update({
          where: {
            id: applicationSubmissionId,
          },
          data: {
            applicationSubmissionStatus: status,
            updatedAt: new Date(),
          },
          include: {
            applicationSubmissionAnswers: true,
            application: true,
          },
        });
      } else {
        return await ctx.prisma.applicationSubmission.create({
          data: {
            userId,
            applicationId,
            applicationSubmissionStatus: status,
          },
          include: {
            applicationSubmissionAnswers: true,
            application: true,
          },
        });
      }
    }),

  // Procedure to get all submissions for the user
  getApplicationSubmissionsForUser: protectedProcedure.query(
    async ({ ctx }) => {
      const userId = ctx.user.userId;

      const applicationSubmissions =
        await ctx.prisma.applicationSubmission.findMany({
          where: {
            userId,
          },
          include: {
            application: {
              include: {
                questions: {
                  orderBy: {
                    orderNumber: "asc",
                  },
                },
                project: {
                  select: {
                    id: true,
                  },
                },
              },
            },
            applicationSubmissionAnswers: true,
          },
        });

      applicationSubmissions.forEach(async (applicationSubmission) => {
        const application = applicationSubmission.application;
        checkIfApplicationPastDeadline(ctx, application);
      });

      return applicationSubmissions;
    },
  ),

  // Procedure to retrieve a specific submission by application ID for a user
  getApplicationSubmissionByApplicationId: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { applicationId } = input;

      const userId = ctx.user.userId;

      const applicationSubmission =
        await ctx.prisma.applicationSubmission.findFirst({
          where: {
            applicationId,
            userId,
          },
          include: {
            applicationSubmissionAnswers: true,
            application: true,
          },
        });

      if (applicationSubmission) {
        const application = applicationSubmission.application;
        checkIfApplicationPastDeadline(ctx, application);
      }

      return applicationSubmission;
    }),

  // Procedure to withdraw a submission
  withdrawApplicationSubmission: protectedProcedure
    .input(
      z.object({
        applicationSubmissionId: z.string(),
        applicationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationSubmissionId, applicationId } = input;

      // Delete related submission answers
      await ctx.prisma.applicationSubmissionAnswer.deleteMany({
        where: {
          applicationSubmissionId,
        },
      });

      const applicationSubmissionEvaluation =
        await ctx.prisma.applicationSubmissionEvaluation.findFirst({
          where: {
            applicationSubmissionId,
          },
        });

      if (applicationSubmissionEvaluation) {
        // Delete application submissions comments
        await ctx.prisma.applicationSubmissionComment.deleteMany({
          where: {
            applicationSubmissionEvaluationId:
              applicationSubmissionEvaluation.id,
          },
        });

        // Delete the evaluation associated with the submission
        await ctx.prisma.applicationSubmissionEvaluation.delete({
          where: {
            id: applicationSubmissionEvaluation.id,
          },
        });
      }

      // Delete the application submission
      await ctx.prisma.applicationSubmission.delete({
        where: {
          id: applicationSubmissionId,
        },
      });

      // Create a caller and delete the supabase folder for the submission
      const supabaseCaller = supabaseRouter.createCaller(ctx);
      await supabaseCaller.clearSupabaseFolderApplication({ applicationId });

      const numSubmissions = await ctx.prisma.applicationSubmission.count({
        where: {
          applicationId,
        },
      });

      // If the number of submissions with the application is 0, we can delete the application
      if (numSubmissions === 0) {
        const application = await ctx.prisma.application.findUnique({
          where: {
            id: applicationId,
          },
        });

        if (!application?.projectId) {
          await ctx.prisma.application.delete({
            where: {
              id: applicationId,
            },
          });
        }
      }
    }),

  // Procedure to get submission for an evaluator
  getApplicationSubmissionByIdForEvaluator: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        applicationSubmissionId: z.string(),
      }),
    )
    .use(isEvaluator)
    .query(async ({ ctx, input }) => {
      const { applicationSubmissionId } = input;

      const applicationSubmission =
        await ctx.prisma.applicationSubmission.findFirstOrThrow({
          where: {
            id: applicationSubmissionId,
            applicationSubmissionStatus: {
              not: ApplicationSubmissionStatus.DRAFT,
            },
          },
          include: {
            applicationSubmissionAnswers: true,
            application: {
              include: {
                questions: true,
              },
            },
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        });

      if (applicationSubmission) {
        const application = applicationSubmission.application;
        checkIfApplicationPastDeadline(ctx, application);
      }

      return applicationSubmission;
    }),
});
