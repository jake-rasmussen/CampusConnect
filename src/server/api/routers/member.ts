import { clerkClient } from "@clerk/nextjs";
import { Member, ProjectMemberType, User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, isAdmin, t } from "../trpc";

// A function to update a user's metadata, which stores information about which projects
// the user has leadership roles in, by storing the project IDs
export const updateMetadata = async (user: User & { memberships: Member[] }) => {
  const evaluatorProjectIds: string[] = [];
  const adminProjectIds: string[] = [];

  user.memberships.forEach((membership: Member) => {
    if (membership.type === ProjectMemberType.ADMIN) {
      adminProjectIds.push(membership.projectId);
    } else if (membership.type === ProjectMemberType.EVALUATOR) {
      evaluatorProjectIds.push(membership.projectId);
    }
  });

  try {
    await clerkClient.users.updateUserMetadata(user.externalId, {
      publicMetadata: {
        evaluatorProjectIds: JSON.stringify(evaluatorProjectIds),
        adminProjectIds: JSON.stringify(adminProjectIds),
      },
    });
  } catch (error) {
    console.error("Error updating Clerk metadata:", error);
    throw new Error("Failed to update user metadata");
  }
};

export const memberRouter = createTRPCRouter({
  // Admin-only procedure to create a member for a project
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
          userId,
        },
        include: {
          memberships: true,
        },
      });

      if (user) {
        try {
          await updateMetadata(user);
        } catch (_) {}
      }

      return member;
    }),
  // Admin-only procedure to delete a project member with its user ID
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
          userId,
        },
        include: {
          memberships: true,
        },
      });

      if (user) {
        try {
          await updateMetadata(user);
        } catch (_) {}
      }

      return member;
    }),
  // Admin-only procedure to update the user's role, with the provided role
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
          userId,
        },
        include: {
          memberships: true,
        },
      });

      if (user) {
        try {
          await updateMetadata(user);
        } catch (_) {}
      }

      return member;
    }),
  // Admin-only procedure to get all members with a specific project
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
