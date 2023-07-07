import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

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
});
