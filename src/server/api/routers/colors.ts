import { z } from "zod";

import { createTRPCRouter, isAdmin, t } from "../trpc";

export const colorsRouter = createTRPCRouter({
  // Admin-only procedure to retrieve all contact information entries associated with a specific project
  getColorsByProjectId: t.procedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      const project = await ctx.prisma.project.findUniqueOrThrow({
        where: {
          id: projectId,
        },
        include: {
          colors: true,
        },
      });

      return project.colors;
    }),
  upsertColorsByProjectId: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        primaryColor: z.string(),
        secondaryColor: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { primaryColor, secondaryColor, projectId } = input;
      const project = await ctx.prisma.project.findUniqueOrThrow({
        where: {
          id: projectId,
        },
        include: {
          colors: true,
        },
      });

      if (project.colors.id === "default") {
        const colors = await ctx.prisma.colors.create({
          data: {
            primaryColor,
            secondaryColor,
            project: {
              connect: { id: projectId },
            },
          },
        });

        return colors;
      } else {
        return await ctx.prisma.colors.update({
          where: {
            id: project.colors.id,
          },
          data: {
            primaryColor,
            secondaryColor,
          },
        });
      }
    }),
});
