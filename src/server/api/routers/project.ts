import { clerkClient } from "@clerk/nextjs";
import {
  ApplicationStatus,
  Colors,
  Member,
  Project,
  ProjectMemberType,
  School,
  UserType,
} from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, isAdmin, isSchoolAdmin, protectedProcedure, t } from "../trpc";
import { updateMetadata } from "./member";

export const projectRouter = createTRPCRouter({
  // Procedure to get project information by project ID for any signed in user
  getProjectByIdForUsers: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

      const project = await ctx.prisma.project.findUnique({
        where: { id: projectId },
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

      // If project exists but `isVisible` is true, return null or throw an error
      if (!project?.isVisible) {
        throw new Error("This project is not available.");
      }

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
  updateProject: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        description: z.string().optional(),
        isVisible: z.boolean().optional(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { projectId, description, isVisible } = input;
      const project = await ctx.prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          description,
          isVisible,
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
        colors: true,
      },
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
        project: {
          include: {
            colors: true,
          },
        },
      },
    });

    let projects: (Project & {
      colors: Colors;
    })[] = [];
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
        project: {
          include: {
            colors: true,
          },
        },
      },
    });

    let projects: (Project & {
      colors: Colors;
    })[] = [];
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
        school: z.enum(Object.values(School) as [string, ...string[]]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description, school } = input;

      let colors = await ctx.prisma.colors.findFirst({
        where: { id: "default" },
      });

      if (!colors) {
        colors = await ctx.prisma.colors.create({
          data: {
            id: "default",
            primaryColor: "#1746A2",
            secondaryColor: "#5F9DF7",
          },
        });
      }

      const project = await ctx.prisma.project.create({
        data: {
          name,
          description,
          school: school as School,
          colorsId: colors.id,
        },
      });

      // // Automatically make the user an admin in the project that they had created
      // const userId = ctx.user.userId;
      // await ctx.prisma.member.create({
      //   data: {
      //     projectId: project.id,
      //     userId,
      //     type: ProjectMemberType.ADMIN,
      //   },
      // });

      // // Update the user's Clerk metadata
      // const user = await ctx.prisma.user.findUnique({
      //   where: {
      //     userId,
      //   },
      //   include: {
      //     memberships: true,
      //   },
      // });

      // if (user) {
      //   const evaluatorProjectIds: string[] = [];
      //   const adminProjectIds: string[] = [];

      //   user.memberships.forEach((membership: Member) => {
      //     if (membership.type === ProjectMemberType.ADMIN) {
      //       adminProjectIds.push(membership.projectId);
      //     } else {
      //       evaluatorProjectIds.push(membership.projectId);
      //     }
      //   });

      //   adminProjectIds.push(project.id);

      //   await clerkClient.users.updateUserMetadata(user.externalId, {
      //     publicMetadata: {
      //       evaluatorProjectIds: JSON.stringify(evaluatorProjectIds),
      //       adminProjectIds: JSON.stringify(adminProjectIds),
      //     },
      //   });
      // }

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
  checkProjectBanner: t.procedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

      return await ctx.prisma.project.findUnique({
        where: {
          id: projectId,
        },
        select: {
          hasBanner: true,
        },
      });
    }),
  createProjectCreationForm: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        validation: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, validation } = input;

      return await ctx.prisma.projectCreationForm.create({
        data: {
          name,
          validation,
          school: School.JOHNS_HOPKINS_UNIVERSITY,
          userId: ctx.user.userId,
        },
      });
    }),
  getAllProjectCreationForms: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.projectCreationForm.findMany({
      include: {
        user: true,
      },
    });
  }),
  deleteProjectCreationForm: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.prisma.projectCreationForm.delete({
        where: {
          id,
        },
      });
    }),
  createProjectAsSchoolAdmin: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
        userId: z.string().min(1),
        projectCreationFormId: z.string().min(1),
      }))
    .use(isSchoolAdmin)
    .mutation(async ({ ctx, input }) => {
      const { name, userId, projectCreationFormId } = input;

      // Create the project
      const project = await ctx.prisma.project.create({
        data: {
          name,
          description: "Please enter a description.",
          school: School.JOHNS_HOPKINS_UNIVERSITY,
          colorsId: "default",
        },
      });

      await ctx.prisma.member.create({
        data: {
          projectId: project.id,
          userId,
          type: ProjectMemberType.ADMIN,
        },
      });

      // Fetch user with memberships
      const user = await ctx.prisma.user.findFirst({
        where: { userId },
        include: { memberships: true },
      });

      // Update metadata if user exists
      if (user) {
        try {
          await updateMetadata(user);
        } catch (_) { }
      }

      // Delete the project creation form after the project is created
      await ctx.prisma.projectCreationForm.delete({
        where: { id: projectCreationFormId },
      });

      return project;
    }),
});
