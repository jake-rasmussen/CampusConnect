import { z } from "zod";

import { supabase } from "~/server/supabase/supabaseClient";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const supabaseRouter = createTRPCRouter({
  // Procedure to clear a folder for the current user
  // Only the current user should ever be able to clear their supabase folder
  clearSupabaseFolder: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationId } = input;

      const { data: fileList } = await supabase.storage
        .from("bucket") // The bucket name, be sure to update if that should ever change
        .list(`${applicationId}/${ctx.user.userId}`);

      if (fileList && fileList.length > 0) {
        const filesToRemove = fileList.map(
          (x) => `${applicationId}/${ctx.user.userId}/${x.name}`,
        );
        await supabase.storage.from("bucket").remove(filesToRemove);
      }
    }),
  // Procedure to get the supabase folder for the current user
  getSupabaseFolder: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { applicationId } = input;

      const { data } = await supabase.storage
        .from("bucket")
        .list(`${applicationId}/${ctx.user.userId}`);

      if (data) {
        const fileList = data.map((x) => x.name);
        return fileList;
      } else {
        return [];
      }
    }),
  // Procedure to create a signed URL for uploading files to a specific folder in Supabase storage
  createSignedUrlUpload: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        filename: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { applicationId, filename } = input;

      const { data, error } = await supabase.storage
        .from("bucket")
        .createSignedUploadUrl(
          `${applicationId}/${ctx.user.userId}/${filename}`,
        );

      return data?.signedUrl || error;
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

      const { data, error } = await supabase.storage
        .from("bucket")
        .createSignedUrl(`${applicationId}/${updatedUserId}/${filename}`, 60, {
          download: !filename.includes(".pdf"),
        });

      return data?.signedUrl || error;
    }),
});
