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
});
