import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const applicationSubmissionRouter = createTRPCRouter({
  upsertApplicationSubmission: protectedProcedure
    .input(
      z.object({
        applicationSubmissionId: z.string().optional(),
        applicationId: z.string(),
        status: z.enum(["NEW", "SUBMITTED", "DRAFT"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationSubmissionId, applicationId, status } = input;
      const userId = ctx.user.userId;

      const applicationSubmission =
        await ctx.prisma.applicationSubmission.upsert({
          where: {
            id: applicationSubmissionId || "",
          },
          create: {
            userId,
            applicationId,
            applicationSubmissionStatus: status,
          },
          update: {
            applicationSubmissionStatus: status,
            updatedAt: new Date(),
          },
        });

      return applicationSubmission;
    }),
  updateApplicationSubmission: protectedProcedure
    .input(
      z.object({
        applicationSubmissionId: z.string(),
        status: z.enum(["NEW", "SUBMITTED", "DRAFT"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationSubmissionId, status } = input;

      const applicationSubmission =
        await ctx.prisma.applicationSubmission.update({
          where: {
            id: applicationSubmissionId,
          },
          data: {
            applicationSubmissionStatus: status,
            updatedAt: new Date(),
          },
        });
    }),
  getApplicationSubmissionsForUser: protectedProcedure.query(
    async ({ ctx }) => {
      const userId = ctx.user.userId;

      return await ctx.prisma.applicationSubmission.findMany({
        where: {
          userId,
        },
        include: {
          application: {
            include: {
              questions: {
                orderBy: {
                  orderNumber: "asc"
                }
              },
            },
          },
          applicationSubmissionAnswers: true,
        },
      });
    },
  ),
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
            applicationId: applicationId,
            userId,
          },
          include: {
            applicationSubmissionAnswers: true,
          },
        });

      return applicationSubmission;
    }),
  withdrawApplicationSubmission: protectedProcedure
    .input(
      z.object({
        applicationSubmissionId: z.string(),
        applicationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationSubmissionId, applicationId } = input;

      await ctx.prisma.applicationSubmissionAnswer.deleteMany({
        where: {
          applicationSubmissionId,
        },
      });

      await ctx.prisma.applicationSubmission.delete({
        where: {
          id: applicationSubmissionId,
        },
      });

      const numSubmissions = await ctx.prisma.applicationSubmission.count({
        where: {
          applicationId,
        },
      });

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
});
