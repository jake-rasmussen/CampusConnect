import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const contactInfoRouter = createTRPCRouter({
  getContactInfosByProjectId: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      const contactInfos = await ctx.prisma.contactInfo.findMany({
        where: {
          projectId,
        },
      });
      return contactInfos;
    }),
  updateContactInfoById: adminProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string().optional(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, firstName, lastName, email, phone, role } = input;
      const contactInfo = await ctx.prisma.contactInfo.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          email,
          phone,
          role,
        },
      });

      return contactInfo;
    }),
  createContactInfo: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string().optional(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, firstName, lastName, email, phone, role } = input;

      const contactInfo = await ctx.prisma.contactInfo.create({
        data: {
          projectId,
          firstName,
          lastName,
          email,
          phone,
          role,
        },
      });

      return contactInfo;
    }),
  deleteContactInfoById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const contactInfo = await ctx.prisma.contactInfo.delete({
        where: {
          id,
        },
      });
      return contactInfo;
    }),
});
