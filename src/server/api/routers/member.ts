import { ProjectMemberType } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const memberRouter = createTRPCRouter({
  createMember: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
      }),
    )
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
  deleteMember: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, userId } = input;

      const member = await ctx.prisma.member.delete({
        where: {
          projectId_userId: { projectId, userId },
        },
      });
      return member;
    }),
  updateMember: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
        type: z.enum([ProjectMemberType.ADMIN, ProjectMemberType.EVALUATOR]),
      }),
    )
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
  getAllMembersByProjectId: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
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
