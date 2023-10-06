import { Club, ClubMember } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

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
          clubApplications: true,
          events: true,
          clubContactInfo: true,
          clubSocialMedia: true,
          members: {
            include: {
              user: true,
            },
          },
        },
      });

      return club;
    }),
  getClubByIdForAdmin: adminProcedure
    .input(z.object({ clubId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { clubId } = input;
      const club = await ctx.prisma.club.findUniqueOrThrow({
        where: {
          id: clubId,
        },
        include: {
          clubApplications: true,
          events: {
            orderBy: {
              date: "asc",
            },
          },
        },
      });

      return club;
    }),
  updateDescriptionByClubId: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubId, description } = input;
      const club = await ctx.prisma.club.update({
        where: {
          id: clubId,
        },
        data: {
          description,
        },
      });
      return club;
    }),
  getAllClubs: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.club.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
  getMemberClubs: adminProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.userId;

    const clubMemberships = await ctx.prisma.clubMember.findMany({
      where: {
        userId,
      },
      include: {
        club: true,
      },
    });

    let clubs: Club[] = [];
    clubMemberships.forEach((clubMembership) => {
      clubs.push(clubMembership.club);
    });
    return clubs;
  }),
  searchForClubs: protectedProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { query } = input;
      const clubs = await ctx.prisma.club.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      });

      return clubs;
    }),
});
