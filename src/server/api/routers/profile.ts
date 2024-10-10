import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SocialMediaPlatformType } from "@prisma/client";

export const profileRouter = createTRPCRouter({
  createProfile: protectedProcedure
    .input(z.object({
      skills: z.string().array(),
      about: z.string(),
      school: z.string(),
      year: z.string(),
      socialMedias: z.object({
        url: z.string(),
        platform: z.enum([
          SocialMediaPlatformType.TWITTER,
          SocialMediaPlatformType.INSTAGRAM,
          SocialMediaPlatformType.FACEBOOK,
          SocialMediaPlatformType.LINKEDIN,
          SocialMediaPlatformType.WEBSITE,
        ]),
      }).array(),
    }))
    .mutation(async ({ ctx, input }) => {
      const {
        skills,
        about,
        school,
        year,
        socialMedias
      } = input;

      const userId = ctx.user.userId

      return await ctx.prisma.profile.create({
        data: {
          skills,
          about,
          school,
          year,
          userId,
          profileSocialMedia: {
            create: socialMedias,
          }
        }
      })
    }),
  getProfileByUserId: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.user.userId;

      return await ctx.prisma.profile.findUnique({
        where: {
          userId
        },
        include: {
          user: true,
          profileSocialMedia: true,
        }
      });
    })
});
