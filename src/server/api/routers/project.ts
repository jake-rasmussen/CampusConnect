import { Project } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(z.object({
      name: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      await ctx.prisma.project.create({
        data: {
          name,
          description: "Please edit the description"
        }
      })
    }),
  getProjectByIdForUsers: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      const project = await ctx.prisma.project.findUniqueOrThrow({
        where: {
          id: projectId,
        },
        include: {
          applications: {
            include: {
              questions: true,
            },
          },
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
  getProjectByIdForAdmin: adminProcedure
    .input(z.object({ projectId: z.string() }))
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
              date: "asc",
            },
          },
        },
      });
      return project;
    }),
  updateDescriptionByProjectId: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
        description: z.string(),
      }),
    )
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
  getAdminProjects: adminProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.userId;

    const members = await ctx.prisma.member.findMany({
      where: {
        userId,
      },
      include: {
        project: true,
      },
    });

    let projects: Project[] = [];
    members.forEach((member) => {
      projects.push(member.project);
    });
    return projects;
  }),
});
