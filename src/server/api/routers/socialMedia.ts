import { SocialMediaPlatformType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, isAdmin, t } from "../trpc";

export const socialMediaRouter = createTRPCRouter({
  // Admin-only procedure to update a project's social media
  updateSocialMediaById: t.procedure
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
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
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
  // Admin-only procedure to create a project's social media
  createSocialMedia: t.procedure
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
    .use(isAdmin)
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
  // Admin-only procedure to delete a project's social media
  deleteSocialMediaById: t.procedure
    .input(
      z.object({
        id: z.string(),
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const socialMedia = await ctx.prisma.socialMedia.delete({
        where: {
          id,
        },
      });
      return socialMedia;
    }),
  // Admin-only procedure to get a project's social media
  getSocialMediaByProjectId: t.procedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .use(isAdmin)
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
