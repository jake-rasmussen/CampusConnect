import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  // Procedure to get users by their email
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
  // Procedure to get user info by their ID
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
  // Procedure to get the user associated with the context
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
