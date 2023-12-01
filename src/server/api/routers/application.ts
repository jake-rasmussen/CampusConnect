import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, isAdmin, protectedProcedure, t } from "../trpc";

export const applicationRouter = createTRPCRouter({
  getProjectApplicationsByProjectId: t.procedure
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

      return applications;
    }),
  getAllOpenApplications: protectedProcedure.query(async ({ ctx }) => {
    const applications = await ctx.prisma.application.findMany({
      where: {
        status: ApplicationStatus.OPEN,
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
          status: "OPEN",
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
