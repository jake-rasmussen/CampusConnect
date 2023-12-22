import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { never, z } from "zod";

import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const s3Router = createTRPCRouter({
  getObjects: protectedProcedure.query(async ({ ctx }) => {
    const listObjectsOutput = await ctx.s3.listObjectsV2({
      Bucket: env.BUCKET_NAME,
    });

    return listObjectsOutput.Contents ?? [];
  }),
  getObject: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input, ctx }) => {
      const { key } = input;

      return await ctx.s3.getObject({
        Bucket: env.BUCKET_NAME,
        Key: key,
      });
    }),
  getPresignedUrlUpload: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        applicationId: z.string(),
        filename: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, applicationId, filename } = input;

      const key = `${projectId}/${applicationId}/${ctx.user.userId}/${filename}`;

      const putObjectCommand = new PutObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: key,
      });

      return await getSignedUrl(ctx.s3, putObjectCommand);
    }),
  getPresignedUrlGet: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        applicationId: z.string(),
        filename: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, applicationId, filename } = input;

      const key = `${projectId}/${applicationId}/${ctx.user.userId}/${filename}`;

      const getObjectCommand = new GetObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: key,
      });

      return await getSignedUrl(ctx.s3, getObjectCommand);
    }),
});
