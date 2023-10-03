import { SocialMediaPlatformType } from "@prisma/client";
import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";

export const clubSocialMediaRouter = createTRPCRouter({
  updateClubSocialMediaById: adminProcedure
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
      const clubSocialMedia = await ctx.prisma.clubSocialMedia.update({
        where: {
          id,
        },
        data: {
          url,
          platform,
        },
      });

      return clubSocialMedia;
    }),
  createClubSocialMedia: adminProcedure
    .input(
      z.object({
        clubId: z.string(),
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
      const { clubId, url, platform } = input;
      const clubSocialMedia = await ctx.prisma.clubSocialMedia.create({
        data: {
          clubId,
          url,
          platform,
        },
      });

      return clubSocialMedia;
    }),
  deleteClubSocialMediaById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const clubSocialMedia = await ctx.prisma.clubSocialMedia.delete({
        where: {
          id,
        },
      });
      return clubSocialMedia;
    }),
  getClubSocialMediaByClubId: adminProcedure
    .input(
      z.object({
        clubId: z.string()
      }),
    )
    .query(async ({ ctx, input }) => {
      const { clubId } = input;
      const clubSocialMedia = ctx.prisma.clubSocialMedia.findMany({
        where: {
          clubId,
        },
      });
      return clubSocialMedia;
    })
});
