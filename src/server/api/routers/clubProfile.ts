import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const clubProfileRouter = createTRPCRouter({
  getClubProfileById: protectedProcedure
    .input(z.object({ clubProfileId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { clubProfileId } = input;
      const clubProfile = await ctx.prisma.clubProfile.findUniqueOrThrow({
        where: {
          id: clubProfileId,
        },
        include: {
          clubContactInfo: true,
        },
      });

      return clubProfile;
    }),
});
