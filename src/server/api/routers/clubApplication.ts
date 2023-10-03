import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const clubApplicationRouter = createTRPCRouter({
  getClubApplicationsByClubId: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { clubId } = input;

      const clubApplications = await ctx.prisma.clubApplication.findMany({
        where: {
          clubId,
        },
      });
      
      return clubApplications;
    }),
  createClubApplication: protectedProcedure
    .input(
      z.object({
        clubId: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //TODO: ensure that the user is an admin of the club
      const { clubId, name, description } = input;

      const clubApplication = await ctx.prisma.clubApplication.create({
        data: {
          name,
          description,
          club: {
            connect: {
              id: clubId,
            },
          },
        },
      });

      return clubApplication;
    }),
  updateClubApplication: protectedProcedure
    .input(
      z.object({
        clubApplicationId: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubApplicationId, name, description } = input;

      const clubApplication = await ctx.prisma.clubApplication.update({
        where: {
          id: clubApplicationId,
        },
        data: {
          name,
          description,
        },
      });

      return clubApplication;
    }),
  publishClubApplication: protectedProcedure
    .input(z.object({ applicationId: z.string(), deadline: z.date() }))
    .mutation(async ({ ctx, input }) => {
      const { applicationId, deadline } = input;
      await ctx.prisma.clubApplication.update({
        where: {
          id: applicationId,
        },
        data: {
          deadline,
          status: "OPEN",
        },
      });
    }),
  getClubApplicationById: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { applicationId } = input;

      const clubApplication =
        await ctx.prisma.clubApplication.findUniqueOrThrow({
          where: {
            id: applicationId,
          },
          include: {
            questions: {
              orderBy: {
                orderNumber: "asc",
              },
              include: {
                clubApplicationAnswers: {
                  orderBy: {
                    answerChoice: "asc",
                  },
                },
              },
            },
          },
        });

      return clubApplication;
    }),
});
