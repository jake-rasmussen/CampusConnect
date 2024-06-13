import { z } from "zod";

import { createTRPCRouter, isAdmin, t } from "../trpc";

export const eventRouter = createTRPCRouter({
  // Admin-only procedure to get all events for a project, with the project ID
  getEventsByProjectId: t.procedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      const events = await ctx.prisma.event.findMany({
        where: {
          projectId,
        },
      });

      return events;
    }),
  // Admin-only procedure to update an event by its ID
  updateEventById: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        id: z.string(),
        name: z.string(),
        start: z.date(),
        end: z.date(),
        description: z.string(),
        inPerson: z.boolean(),
        location: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { id, name, start, end, description, inPerson, location } = input;
      const event = await ctx.prisma.event.update({
        where: {
          id,
        },
        data: {
          name,
          start,
          end,
          description,
          inPerson,
          location,
        },
      });

      return event;
    }),
  // Admin-only procedure to create an event
  createEvent: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string(),
        start: z.date(),
        end: z.date(),
        description: z.string(),
        inPerson: z.boolean(),
        location: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { projectId, name, start, end, description, inPerson, location } =
        input;
      const event = await ctx.prisma.event.create({
        data: {
          projectId,
          name,
          start,
          end,
          description,
          inPerson,
          location,
        },
      });

      return event;
    }),
  // Admin-only procedure to delete and event by its ID
  deleteEventById: t.procedure
    .input(
      z.object({
        id: z.string(),
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const event = await ctx.prisma.event.delete({
        where: {
          id,
        },
      });
      return event;
    }),
});
