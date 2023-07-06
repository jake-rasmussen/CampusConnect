import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

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
          clubContactInfo: {
            orderBy: {
              firstName: "asc"
            }
          },
        },
      });

      return clubProfile;
    }),
  updateClubProfileDescription: adminProcedure
    .input(z.object({ id: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, description } = input;
      const clubProfile = await ctx.prisma.clubProfile.update({
        where: {
          id,
        },
        data: {
          description,
        },
      });

      return clubProfile;
    }),
});
