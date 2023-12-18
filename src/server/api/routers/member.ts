import { ProjectMemberType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, isAdmin, t } from "../trpc";

export const memberRouter = createTRPCRouter({
  createMember: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { projectId, userId } = input;

      const member = await ctx.prisma.member.create({
        data: {
          projectId,
          userId,
          type: ProjectMemberType.EVALUATOR,
        },
      });
      return member;
    }),
  deleteMember: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { projectId, userId } = input;

      const member = await ctx.prisma.member.delete({
        where: {
          projectId_userId: { projectId, userId },
        },
      });
      return member;
    }),
  updateMember: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
        type: z.enum([ProjectMemberType.ADMIN, ProjectMemberType.EVALUATOR]),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { projectId, userId, type } = input;

      const member = await ctx.prisma.member.update({
        where: {
          projectId_userId: { projectId, userId },
        },
        data: {
          type,
        },
      });
      return member;
    }),
  getAllMembersByProjectId: t.procedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

      const members = await ctx.prisma.member.findMany({
        where: {
          projectId,
        },
        include: {
          user: true,
        },
      });
      return members;
    }),
});
