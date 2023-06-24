import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const clubRouter = createTRPCRouter({
  getClubByIdForUsers: protectedProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { clubId } = input;
      const club = await ctx.prisma.club.findUniqueOrThrow({
        where: {
          id: clubId,
        },
        include: {
          clubProfile: {
            include: {
              clubContactInfo: true,
            },
          },
          clubApplications: true,
          events: true,
        },
      });

      return club;
    }),
});
