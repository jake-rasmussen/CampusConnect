import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// TODO: if application is live make sure you cannot make edits to it

export const clubApplicationRouter = createTRPCRouter({
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
