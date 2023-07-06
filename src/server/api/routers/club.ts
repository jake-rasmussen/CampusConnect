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
          clubProfile: {
            include: {
              clubContactInfo: true,
            },
          },
          clubApplications: true,
          events: {
            where: {
              date: {
                gte: new Date()
              }
            },
            orderBy: {
              date: "asc"
            }
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
          clubProfile: {
            include: {
              clubContactInfo: true,
            },
          },
          clubApplications: true,
          events: {
            orderBy: {
              date: "asc"
            }
          },
        },
      });

      return club;
    }),

  getAllClubs: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.club.findMany({
      orderBy: {
        name: "asc"
      }
    });
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
