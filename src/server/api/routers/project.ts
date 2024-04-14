import { clerkClient } from "@clerk/nextjs";
import {
  ApplicationStatus,
  Member,
  Project,
  ProjectMemberType,
} from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, isAdmin, protectedProcedure, t } from "../trpc";

export const projectRouter = createTRPCRouter({
  getProjectByIdForUsers: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      const project = await ctx.prisma.project.findUniqueOrThrow({
        where: {
          id: projectId,
        },
        include: {
          events: true,
          contactInfo: true,
          socialMedia: true,
          members: {
            include: {
              user: true,
            },
          },
        },
      });
      return project;
    }),
  getProjectByIdForAdmin: t.procedure
    .input(z.object({ projectId: z.string() }))
    .use(isAdmin)
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      const project = await ctx.prisma.project.findUniqueOrThrow({
        where: {
          id: projectId,
        },
        include: {
          applications: true,
          events: {
            orderBy: {
              start: "asc",
            },
          },
        },
      });
      return project;
    }),
  updateDescriptionByProjectId: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        description: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { projectId, description } = input;
      const project = await ctx.prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          description,
        },
      });
      return project;
    }),
  getAllProjects: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
  getAdminProjects: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.userId;

    const admins = await ctx.prisma.member.findMany({
      where: {
        userId,
        type: ProjectMemberType.ADMIN,
      },
      include: {
        project: true,
      },
    });

    let projects: Project[] = [];
    admins.forEach((member) => {
      projects.push(member.project);
    });
    return projects;
  }),
  getEvaluatorProjects: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.userId;

    const evaluators = await ctx.prisma.member.findMany({
      where: {
        userId,
        type: ProjectMemberType.EVALUATOR,
      },
      include: {
        project: true,
      },
    });

    let projects: Project[] = [];
    evaluators.forEach((evaluator) => {
      projects.push(evaluator.project);
    });
    return projects;
  }),
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description } = input;
      const project = await ctx.prisma.project.create({
        data: {
          name,
          description,
        },
      });

      const userId = ctx.user.userId;
      await ctx.prisma.member.create({
        data: {
          projectId: project.id,
          userId,
          type: ProjectMemberType.ADMIN,
        },
      });

      const user = await ctx.prisma.user.findUnique({
        where: {
          userId,
        },
        include: {
          memberships: true,
        },
      });

      if (user) {
        const evaluatorProjectIds: string[] = [];
        const adminProjectIds: string[] = [];

        user.memberships.forEach((membership: Member) => {
          if (membership.type === ProjectMemberType.ADMIN) {
            adminProjectIds.push(membership.projectId);
          } else {
            evaluatorProjectIds.push(membership.projectId);
          }
        });

        adminProjectIds.push(project.id);

        await clerkClient.users.updateUserMetadata(user.externalId, {
          publicMetadata: {
            evaluatorProjectIds: JSON.stringify(evaluatorProjectIds),
            adminProjectIds: JSON.stringify(adminProjectIds),
          },
        });
      }

      return project;
    }),
  deleteProject: t.procedure
    .input(z.object({ projectId: z.string() }))
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { projectId } = input;

      await ctx.prisma.socialMedia.deleteMany({
        where: {
          projectId,
        },
      });

      await ctx.prisma.member.deleteMany({
        where: {
          projectId,
        },
      });

      await ctx.prisma.event.deleteMany({
        where: {
          projectId,
        },
      });

      await ctx.prisma.contactInfo.deleteMany({
        where: {
          projectId,
        },
      });

      const applicationsWithZeroSubmissions = await ctx.prisma.application.findMany({
        where: {
          projectId
        },
        include: {
          _count: {
            select: { applicationSubmissions: true }
          }
        }
      }).then(applications => applications.filter(application => application._count.applicationSubmissions === 0));

      if (applicationsWithZeroSubmissions.length > 0) {
        await ctx.prisma.application.deleteMany({
          where: {
            id: {
              in: applicationsWithZeroSubmissions.map(application => application.id),
            },
          },
        });
      }

      await ctx.prisma.application.updateMany({
        where: {
          projectId,
        },
        data: {
          projectId: null,
        },
      });
      
      const applicationsWithoutSubmissions =
        await ctx.prisma.application.findMany({
          where: {
            projectId,
            applicationSubmissions: {
              none: {},
            },
          },
          select: {
            id: true,
          },
        });

      applicationsWithoutSubmissions.forEach(async (application) => {
        await ctx.prisma.application.delete({
          where: {
            id: application.id,
          },
        });
      });

      await ctx.prisma.project.delete({
        where: {
          id: projectId,
        },
      });
    }),
});
