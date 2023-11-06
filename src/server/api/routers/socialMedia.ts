import { SocialMediaPlatformType } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const socialMediaRouter = createTRPCRouter({
  updateSocialMediaById: adminProcedure
    .input(
      z.object({
        id: z.string(),
        url: z.string(),
        platform: z.enum([
          SocialMediaPlatformType.TWITTER,
          SocialMediaPlatformType.INSTAGRAM,
          SocialMediaPlatformType.FACEBOOK,
          SocialMediaPlatformType.LINKEDIN,
          SocialMediaPlatformType.WEBSITE,
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, url, platform } = input;
      const socialMedia = await ctx.prisma.socialMedia.update({
        where: {
          id,
        },
        data: {
          url,
          platform,
        },
      });

      return socialMedia;
    }),
  createSocialMedia: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
        url: z.string(),
        platform: z.enum([
          SocialMediaPlatformType.TWITTER,
          SocialMediaPlatformType.INSTAGRAM,
          SocialMediaPlatformType.FACEBOOK,
          SocialMediaPlatformType.LINKEDIN,
          SocialMediaPlatformType.WEBSITE,
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, url, platform } = input;
      const socialMedia = await ctx.prisma.socialMedia.create({
        data: {
          projectId,
          url,
          platform,
        },
      });

      return socialMedia;
    }),
  deleteSocialMediaById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const socialMedia = await ctx.prisma.socialMedia.delete({
        where: {
          id,
        },
      });
      return socialMedia;
    }),
  getSocialMediaByProjectId: adminProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;
      const socialMedia = ctx.prisma.socialMedia.findMany({
        where: {
          projectId,
        },
      });
      return socialMedia;
    }),
});
