import { z } from "zod";

import { supabase } from "~/server/supabase/supabaseClient";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const supabaseRouter = createTRPCRouter({
  clearSupabaseFolder: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        applicationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, applicationId } = input;

      const { data: fileList } = await supabase.storage
        .from("swec-bucket")
        .list(`${applicationId}/${ctx.user.userId}`);

      if (fileList && fileList.length > 0) {
        const filesToRemove = fileList.map(
          (x) => `${applicationId}/${ctx.user.userId}/${x.name}`,
        );
        await supabase.storage.from("swec-bucket").remove(filesToRemove);
      }
    }),
  getSupabaseFolder: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { applicationId } = input;

      const { data } = await supabase.storage
        .from("swec-bucket")
        .list(`${applicationId}/${ctx.user.userId}`);

      if (data) {
        const fileList = data.map((x) => x.name);
        return fileList;
      } else {
        return [];
      }
    }),
  createSignedUrlUpload: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        filename: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationId, filename } = input;

      const { data } = await supabase.storage
        .from("swec-bucket")
        .createSignedUploadUrl(
          `${applicationId}/${ctx.user.userId}/${filename}`,
        );

      return data?.signedUrl;
    }),
  createSignedUrlDownload: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        userId: z.string().optional(),
        filename: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationId, userId, filename } = input;

      let updatedUserId = userId;

      if (!updatedUserId) {
        updatedUserId = ctx.user.userId;
      }

      const { data } = await supabase.storage
        .from("swec-bucket")
        .createSignedUrl(
          `${applicationId}/${updatedUserId}/${filename}`,
          60,
          {
            download: !filename.includes(".pdf"),
          },
        );

      return data?.signedUrl;
    }),
});
