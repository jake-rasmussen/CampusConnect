import { ApplicationStatus, ApplicationSubmissionStatus } from "@prisma/client";
import { z } from "zod";

import { supabase } from "~/server/supabase/supabaseClient";
import { api } from "~/utils/api";
import {
  createTRPCRouter,
  isAdmin,
  isEvaluator,
  protectedProcedure,
  t,
} from "../trpc";

export const applicationRouter = createTRPCRouter({
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
        if (application.deadline && application.deadline < new Date()) {
          await ctx.prisma.application.update({
            where: {
              id: application.id,
            },
            data: {
              status: ApplicationStatus.CLOSED,
            },
          });
        }
      });

      return applications;
    }),
  getProjectApplicationsByProjectIdForUsers: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

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
        if (application.deadline && application.deadline < new Date()) {
          await ctx.prisma.application.update({
            where: {
              id: application.id,
            },
            data: {
              status: ApplicationStatus.CLOSED,
            },
          });
        }
      });

      return applications;
    }),
  getProjectApplicationsByProjectIdForEvaluators: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

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
              applicationSubmissionStatus: true
            },
          },
        },
      });
      
      applications.forEach(app => {
        app.applicationSubmissions = app.applicationSubmissions.filter(sub => sub.applicationSubmissionStatus !== ApplicationSubmissionStatus.DRAFT);
      });

      applications.forEach(async (application) => {
        if (application.deadline && application.deadline < new Date()) {
          await ctx.prisma.application.update({
            where: {
              id: application.id,
            },
            data: {
              status: ApplicationStatus.CLOSED,
            },
          });
        }
      });

      return applications;
    }),
  getAllOpenApplications: protectedProcedure.query(async ({ ctx }) => {
    const applications = await ctx.prisma.application.findMany({
      where: {
        status: ApplicationStatus.OPEN,
        projectId: {
          not: null,
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

      if (application.deadline && application.deadline < new Date()) {
        await ctx.prisma.application.update({
          where: {
            id: applicationId,
          },
          data: {
            status: ApplicationStatus.CLOSED,
          },
        });
      }

      return application;
    }),
  // USE TO EITHER DELETE PROJECT ID REFERENCE OR DELETE IF NO SUBMISSIONS
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
        await ctx.prisma.application.delete({
          where: {
            id: applicationId,
          },
        });
      }
    }),
});
