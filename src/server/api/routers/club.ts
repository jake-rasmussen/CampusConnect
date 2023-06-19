import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const clubRouter = createTRPCRouter({
  getClubById: protectedProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { clubId } = input;
      const club = await ctx.prisma.club.findUniqueOrThrow({
        where: {
          id: clubId,
        },
        include: {
          clubProfile: true,
        },
      });

      return club;
    }),
});
