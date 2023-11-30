import { z } from "zod";

import { createTRPCRouter, isAdmin, t } from "../trpc";

export const contactInfoRouter = createTRPCRouter({
  getContactInfosByProjectId: t.procedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      const contactInfos = await ctx.prisma.contactInfo.findMany({
        where: {
          projectId,
        },
      });
      return contactInfos;
    }),
  updateContactInfoById: t.procedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string().optional(),
        role: z.string(),
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
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
  createContactInfo: t.procedure
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
    .use(isAdmin)
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
  deleteContactInfoById: t.procedure
    .input(
      z.object({
        id: z.string(),
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
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
