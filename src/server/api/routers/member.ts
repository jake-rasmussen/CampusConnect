import { Member, ProjectMemberType, User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, isAdmin, t } from "../trpc";
import { clerkClient } from "@clerk/nextjs";

const updateMetadata = async (user: User & { memberships: Member[] }) => {
  const evaluatorProjectIds: string[] = [];
  const adminProjectIds: string[] = [];

  user!.memberships.forEach((membership: Member) => {
    if (membership.type === ProjectMemberType.ADMIN) {
      adminProjectIds.push(membership.projectId);
    } else {
      evaluatorProjectIds.push(membership.projectId);
    }
  });

  await clerkClient.users.updateUserMetadata(user!.externalId, {
    publicMetadata: {
      evaluatorProjectIds: JSON.stringify(evaluatorProjectIds),
      adminProjectIds: JSON.stringify(adminProjectIds),
    },
  });
}

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

      const user = await ctx.prisma.user.findFirst({
        where: {
          userId
        },
        include: {
          memberships: true
        }
      });
      await updateMetadata(user!);

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

      const user = await ctx.prisma.user.findFirst({
        where: {
          userId
        },
        include: {
          memberships: true
        }
      });
      await updateMetadata(user!);

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

      const user = await ctx.prisma.user.findFirst({
        where: {
          userId
        },
        include: {
          memberships: true
        }
      });
      await updateMetadata(user!);

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
