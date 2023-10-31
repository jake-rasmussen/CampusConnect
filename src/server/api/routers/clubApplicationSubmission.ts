import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const clubApplicationSubmissionRouter = createTRPCRouter({
  upsertClubApplicationSubmission: protectedProcedure
    .input(
      z.object({
        clubApplicationSubmissionId: z.string().optional(),
        clubApplicationId: z.string(),
        status: z.enum(["NEW", "SUBMITTED", "DRAFT"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationSubmissionId, clubApplicationId, status } = input;
      const userId = ctx.user.userId;

      const clubApplicationSubmission =
        await ctx.prisma.clubApplicationSubmission.upsert({
          where: {
            id: clubApplicationSubmissionId || "",
          },
          create: {
            userId,
            clubApplicationId,
            clubApplicationSubmissionStatus: status,
          },
          update: {
            clubApplicationSubmissionStatus: status,
            updatedAt: new Date(),
          },
        });

      return clubApplicationSubmission;
    }),
  updateClubApplicationSubmission: protectedProcedure
    .input(
      z.object({
        clubApplicationSubmissionId: z.string(),
        status: z.enum(["NEW", "SUBMITTED", "DRAFT"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationSubmissionId, status } = input;

      const clubApplicationSubmission =
        await ctx.prisma.clubApplicationSubmission.update({
          where: {
            id: clubApplicationSubmissionId,
          },
          data: {
            clubApplicationSubmissionStatus: status,
            updatedAt: new Date(),
          },
        });
    }),
  getClubApplicationSubmissionsForUser: protectedProcedure.query(
    async ({ ctx }) => {
      const userId = ctx.user.userId;

      return await ctx.prisma.clubApplicationSubmission.findMany({
        where: {
          userId,
        },
      });
    },
  ),
  getClubApplicationSubmissionByClubApplicationId: protectedProcedure
    .input(
      z.object({
        clubApplicationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { clubApplicationId } = input;

      const userId = ctx.user.userId;

      const clubApplicationSubmission =
        await ctx.prisma.clubApplicationSubmission.findFirst({
          where: {
            clubApplicationId,
            userId,
          },
          include: {
            clubApplicationSubmissionAnswers: true,
          },
        });

      console.log("SUBMISSION", clubApplicationSubmission);
      return clubApplicationSubmission;
    }),
});
