import { ClubMemberType } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const clubMemberRouter = createTRPCRouter({
  createClubMember: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubId, userId } = input;

      const member = await ctx.prisma.clubMember.create({
        data: {
          clubId,
          userId,
          type: "GRADER",
        },
      });
      return member;
    }),
  deleteClubMember: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubId, userId } = input;

      const member = await ctx.prisma.clubMember.delete({
        where: {
          clubId_userId: { clubId, userId },
        },
      });
      return member;
    }),
  updateClubMember: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
        userId: z.string(),
        type: z.enum([ClubMemberType.ADMIN, ClubMemberType.GRADER]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubId, userId, type } = input;

      const member = await ctx.prisma.clubMember.update({
        where: {
          clubId_userId: { clubId, userId },
        },
        data: {
          type,
        },
      });
      return member;
    }),
  getAllClubMembers: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { clubId } = input;

      const members = await ctx.prisma.clubMember.findMany({
        where: {
          clubId,
        },
        include: {
          user: true,
        },
      });
      return members;
    }),
});
