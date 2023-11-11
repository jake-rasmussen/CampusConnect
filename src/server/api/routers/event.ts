import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const eventRouter = createTRPCRouter({
  getEventById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const event = await ctx.prisma.event.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return event;
    }),
  getEventsByProjectId: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      const events = await ctx.prisma.event.findMany({
        where: {
          projectId,
        },
      });

      return events;
    }),
  updateEventById: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        date: z.date(),
        description: z.string(),
        inPerson: z.boolean(),
        location: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, date, description, inPerson, location } = input;
      const event = await ctx.prisma.event.update({
        where: {
          id,
        },
        data: {
          name,
          date,
          description,
          inPerson,
          location,
        },
      });

      return event;
    }),
  createEvent: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string(),
        date: z.date(),
        description: z.string(),
        inPerson: z.boolean(),
        location: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, name, date, description, inPerson, location } = input;
      const event = await ctx.prisma.event.create({
        data: {
          projectId,
          name,
          date,
          description,
          inPerson,
          location,
        },
      });

      return event;
    }),
  deleteEventById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
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
