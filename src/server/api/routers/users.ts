import { UserType } from "@prisma/client";
import { z } from "zod";

import { establishMetadata } from "~/pages/api/webhook";
import { createTRPCRouter, protectedProcedure, t } from "../trpc";

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
  updateUser: t.procedure
    .input(
      z.object({
        externalId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        emailAddress: z.string(),
        userType: z.enum([
          UserType.EMPLOYEE,
          UserType.EMPLOYER,
          UserType.INCOMPLETE,
        ]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { externalId, firstName, lastName, emailAddress, userType } = input;

      const user = await ctx.prisma.user.update({
        where: {
          externalId,
        },
        data: {
          firstName,
          lastName,
          emailAddress,
          userType,
        },
        include: {
          memberships: true,
        },
      });

      await establishMetadata(user);
      return user;
    }),
  getUserType: t.procedure
    .input(
      z.object({
        externalId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { externalId } = input;

      return await ctx.prisma.user.findUnique({
        where: {
          externalId,
        },
        select: {
          userType: true,
        },
      });
    }),
});
