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
  // Procedure to get project information by project ID for any signed in user
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
          colors: true,
        },
      });
      return project;
    }),
  // Admin-only procedure to get project information for a project admin
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
  // Admin-only procedure to update a project's description
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
  // Procedure to get all projects for any signed in user
  getAllProjects: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        colors: true
      }
    });
  }),
  // Procedure to get the projects that a person is an admin in
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
  // Procedure to get the projects that a person is an evaluator in
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
  // Procedure to create a project, where any signed in user can create a project
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description } = input;

      let colors = await ctx.prisma.colors.findFirst({
        where: { id: "default" },
      });

      if (!colors) {
        colors = await ctx.prisma.colors.create({
          data: {
            id: "default",
            primaryColor: "#FFFFFF",
            secondaryColor: "#000000",
          },
        });
      }

      const project = await ctx.prisma.project.create({
        data: {
          name,
          description,
          colorsId: colors.id,
        },
      });

      // Automatically make the user an admin in the project that they had created
      const userId = ctx.user.userId;
      await ctx.prisma.member.create({
        data: {
          projectId: project.id,
          userId,
          type: ProjectMemberType.ADMIN,
        },
      });

      // Update the user's Clerk metadata
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
  // Admin-only procedure to delete a project, which any admin user can do
  deleteProject: t.procedure
    .input(z.object({ projectId: z.string() }))
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { projectId } = input;

      // Delete any social media associated with the project
      await ctx.prisma.socialMedia.deleteMany({
        where: {
          projectId,
        },
      });

      // Delete any memberships associated with the project
      await ctx.prisma.member.deleteMany({
        where: {
          projectId,
        },
      });

      // Delete any events associated with the project
      await ctx.prisma.event.deleteMany({
        where: {
          projectId,
        },
      });

      // Delete any contact infos associated with the project
      await ctx.prisma.contactInfo.deleteMany({
        where: {
          projectId,
        },
      });

      // We only want to delete an application if the application has no submissions
      // Get all applications with zero submissions
      const applicationsWithZeroSubmissions = await ctx.prisma.application
        .findMany({
          where: {
            projectId,
          },
          include: {
            _count: {
              select: { applicationSubmissions: true },
            },
          },
        })
        .then((applications) =>
          applications.filter(
            (application) => application._count.applicationSubmissions === 0,
          ),
        );

      // Delete all (if any) applications with zero submissions
      if (applicationsWithZeroSubmissions.length > 0) {
        await ctx.prisma.application.deleteMany({
          where: {
            id: {
              in: applicationsWithZeroSubmissions.map(
                (application) => application.id,
              ),
            },
          },
        });
      }

      // Disconnect all projects with their current project
      await ctx.prisma.application.updateMany({
        where: {
          projectId,
        },
        data: {
          projectId: null,
        },
      });

      // Just delete all applications that have 0 submissions
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

      // Finally, delete the project
      await ctx.prisma.project.delete({
        where: {
          id: projectId,
        },
      });
    }),
});
