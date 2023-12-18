import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getUsersByQuery: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { query } = input;

      const users = await ctx.prisma.user.findMany({
        where: {
          emailAddress: {
            contains: query,
          },
        },
      });
      return users;
    }),
  getUserById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          userId,
        },
      });
      return user;
    }),
});
