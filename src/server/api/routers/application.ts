import {
  Application,
  ApplicationStatus,
  ApplicationSubmissionStatus,
  Prisma,
  PrismaClient,
  User,
} from "@prisma/client";
import { NextApiRequest } from "next/types";
import { z } from "zod";

import { createTRPCRouter, isAdmin, protectedProcedure, t } from "../trpc";

//A function to check if the application deadline has passed and update the application status to CLOSED
export const checkIfApplicationPastDeadline = async (
  ctx: {
    prisma: PrismaClient<
      Prisma.PrismaClientOptions,
      never,
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
    user: User;
    req: NextApiRequest;
  },
  application: Application,
) => {
  // If the current time has surpassed the deadline close the application
  if (application.deadline && new Date() > application.deadline) {
    await ctx.prisma.application.update({
      where: {
        id: application.id,
      },
      data: {
        status: ApplicationStatus.CLOSED,
      },
    });
  }
};

// Define and export a TRPC router for handling various application-related API requests
export const applicationRouter = createTRPCRouter({
  // Admin only procedure to get project applications by project ID
  getProjectApplicationsByProjectIdForAdmin: t.procedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

      const applications = await ctx.prisma.application.findMany({
        where: {
          projectId,
        },
        include: {
          questions: {
            orderBy: {
              orderNumber: "asc",
            },
          },
        },
      });

      applications.forEach(async (application) => {
        checkIfApplicationPastDeadline(ctx, application);
      });

      return applications;
    }),

  // Procedure for users to get project applications filtered by status and project ID
  getProjectApplicationsByProjectIdForUsers: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

      // We want to include applications that are closed and open for admins
      const applications = await ctx.prisma.application.findMany({
        where: {
          projectId,
          status: {
            not: ApplicationStatus.DRAFT,
          },
        },
        include: {
          questions: {
            orderBy: {
              orderNumber: "asc",
            },
          },
        },
      });

      applications.forEach(async (application) => {
        checkIfApplicationPastDeadline(ctx, application);
      });

      return applications;
    }),

  // Procedure for evaluators to get applications filtered by non-draft status
  getProjectApplicationsByProjectIdForEvaluators: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

      // We want to include applications that are closed and open for evaluators
      const applications = await ctx.prisma.application.findMany({
        where: {
          projectId,
          status: {
            not: ApplicationStatus.DRAFT,
          },
        },
        include: {
          applicationSubmissions: {
            select: {
              id: true,
              user: true,
              applicationSubmissionStatus: true,
            },
          },
        },
      });

      applications.forEach((app) => {
        app.applicationSubmissions = app.applicationSubmissions.filter(
          (sub) =>
            sub.applicationSubmissionStatus !==
            ApplicationSubmissionStatus.DRAFT,
        );
      });

      applications.forEach(async (application) => {
        checkIfApplicationPastDeadline(ctx, application);
      });

      return applications;
    }),

  // Procedure to get all open applications
  getAllOpenApplications: protectedProcedure.query(async ({ ctx }) => {
    const applications = await ctx.prisma.application.findMany({
      where: {
        status: ApplicationStatus.OPEN,
        projectId: {
          not: null, // If project ID is null, it means the project has been deleted or the application has been removed from a project
        },
        deadline: {
          gt: new Date(),
        },
      },
      include: {
        questions: {
          orderBy: {
            orderNumber: "asc",
          },
        },

        project: true,
      },
    });

    return applications;
  }),

  // Admin-only procedure to create a new application
  createApplication: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { projectId, name, description } = input;

      const application = await ctx.prisma.application.create({
        data: {
          name,
          description,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });

      return application;
    }),

  // Admin-only procedure to update an existing application
  updateApplication: t.procedure
    .input(
      z.object({
        applicationId: z.string(),
        name: z.string(),
        description: z.string(),
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { applicationId, name, description } = input;

      const application = await ctx.prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          name,
          description,
        },
      });

      return application;
    }),

  // Admin-only procedure to publish an application with a deadline and optional skills
  publishApplication: t.procedure
    .input(
      z.object({
        applicationId: z.string(),
        deadline: z.date(),
        skills: z.string().array().optional(),
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { applicationId, deadline, skills } = input;
      await ctx.prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          deadline,
          desiredSkills: skills,
          status:
            deadline > new Date()
              ? ApplicationStatus.OPEN
              : ApplicationStatus.CLOSED,
        },
      });
    }),

  // Procedure to retrieve a specific application by ID, with questions included
  getApplicationById: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { applicationId } = input;

      const application = await ctx.prisma.application.findUniqueOrThrow({
        where: {
          id: applicationId,
        },
        include: {
          questions: {
            orderBy: {
              orderNumber: "asc",
            },
          },
        },
      });

      checkIfApplicationPastDeadline(ctx, application);

      return application;
    }),

  // Admin-only procedure to either disconnect or delete an application from a project depending on submissions
  removeApplicationFromProject: t.procedure
    .input(
      z.object({
        applicationId: z.string(),
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { applicationId } = input;

      const application = await ctx.prisma.application.findUniqueOrThrow({
        where: {
          id: applicationId,
        },
        include: {
          applicationSubmissions: true,
        },
      });

      // If the application has submissions, then disconnect it from the project and close the application
      // We still want to allow users to view applications even if the project removes it
      // The application will be permanentaly deleted once a user withdraws the applications and the
      // application has no submissions
      if (application.applicationSubmissions.length > 0) {
        await ctx.prisma.application.update({
          where: {
            id: applicationId,
          },
          data: {
            project: {
              disconnect: true,
            },
            status: ApplicationStatus.CLOSED,
          },
        });
      } else {
        // If there are no submissions for the application, just delete it
        await ctx.prisma.application.delete({
          where: {
            id: applicationId,
          },
        });
      }
    }),
});
