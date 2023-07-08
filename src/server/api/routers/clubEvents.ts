import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const clubEventsRouter = createTRPCRouter({
  getClubEventById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const event = await ctx.prisma.clubEvent.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return event;
    }),
  getClubEventsByClubId: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { clubId } = input;
      const events = await ctx.prisma.clubEvent.findMany({
        where: {
          clubId,
        },
      });

      return events;
    }),
  updateClubEventById: adminProcedure
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
      const clubEvent = await ctx.prisma.clubEvent.update({
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

      return clubEvent;
    }),
  createClubEvent: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
        name: z.string(),
        date: z.date(),
        description: z.string(),
        inPerson: z.boolean(),
        location: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { clubId, name, date, description, inPerson, location } = input;
      const clubEvent = await ctx.prisma.clubEvent.create({
        data: {
          clubId,
          name,
          date,
          description,
          inPerson,
          location,
        },
      });

      return clubEvent;
    }),
  deleteClubEventById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const clubEvent = await ctx.prisma.clubEvent.delete({
        where: {
          id,
        },
      });
      return clubEvent;
    }),
});
