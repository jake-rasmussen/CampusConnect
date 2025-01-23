import { Focus, School, SocialMediaPlatformType } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  createProfile: protectedProcedure
    .input(
      z.object({
        skills: z.string().array(),
        about: z.string(),
        school: z.string(),
        year: z.string(),
        socialMedias: z
          .object({
            url: z.string(),
            platform: z.enum([
              SocialMediaPlatformType.TWITTER,
              SocialMediaPlatformType.INSTAGRAM,
              SocialMediaPlatformType.FACEBOOK,
              SocialMediaPlatformType.LINKEDIN,
              SocialMediaPlatformType.WEBSITE,
            ]),
          })
          .array(),
        majors: z.nativeEnum(Focus),
        minors: z.nativeEnum(Focus).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { skills, about, school, year, socialMedias, majors, minors } = input;

      const userId = ctx.user.userId;

      return await ctx.prisma.profile.create({
        data: {
          skills,
          about,
          school: school as School,
          year,
          user: { connect: { userId } },
          profileSocialMedia: {
            create: socialMedias,
          },
          majors: [majors as Focus],
          minors: [minors as Focus]
        },
      });
    }),
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.userId;

    return await ctx.prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        user: true,
        profileSocialMedia: true,
      },
    });
  }),
  getProfileById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      return await ctx.prisma.profile.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
          profileSocialMedia: true,
        },
      });
    }),
  getProfiles: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1), // Page number
        limit: z.number().min(1).max(100).default(10), // Profiles per page
      }),
    )
    .query(async ({ input, ctx }) => {
      const { page, limit } = input;

      const profiles = await ctx.prisma.profile.findMany({
        skip: (page - 1) * limit, // Skip profiles based on the page number
        take: limit, // Limit the number of profiles returned
        include: {
          user: true,
        },
        orderBy: {
          id: "asc", // Sort profiles by id (or any other criteria)
        },
      });

      const totalProfiles = await ctx.prisma.profile.count(); // Get the total number of profiles

      return {
        profiles,
        totalProfiles, // Return total count to calculate total pages
      };
    }),
});
