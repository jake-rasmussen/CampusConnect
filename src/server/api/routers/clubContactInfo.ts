import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const clubContactInfoRouter = createTRPCRouter({
  getClubContactInfosByClubId: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { clubId } = input;
      const clubContactInfos = await ctx.prisma.clubContactInfo.findMany({
        where: {
          clubId,
        },
      });
      return clubContactInfos;
    }),
  updateClubContactInfoById: adminProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string().optional(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, firstName, lastName, email, phone, role } = input;
      const clubContactInfo = await ctx.prisma.clubContactInfo.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          email,
          phone,
          role,
        },
      });

      return clubContactInfo;
    }),
  createClubContactInfo: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string().optional(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubId, firstName, lastName, email, phone, role } = input;

      const clubContactInfo = await ctx.prisma.clubContactInfo.create({
        data: {
          clubId,
          firstName,
          lastName,
          email,
          phone,
          role,
        },
      });

      return clubContactInfo;
    }),
  deleteClubContactInfoById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const clubContactInfo = await ctx.prisma.clubContactInfo.delete({
        where: {
          id,
        },
      });
      return clubContactInfo;
    }),
});
