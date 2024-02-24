import { z } from "zod";

import { supabase } from "~/server/supabase/supabaseClient";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const supabaseRouter = createTRPCRouter({
  createSignedUrlUpload: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        applicationId: z.string(),
        filename: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, applicationId, filename } = input;

      const { data } = await supabase.storage
        .from("swec-bucket")
        .createSignedUploadUrl(
          `${projectId}/${applicationId}/${ctx.user.userId}/${filename}`,
        );

      return data?.signedUrl;
    }),
  createSignedUrlDownload: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        applicationId: z.string(),
        filename: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, applicationId, filename } = input;

      const { data } = await supabase.storage
        .from("swec-bucket")
        .createSignedUrl(
          `${projectId}/${applicationId}/${ctx.user.userId}/${filename}`,
          60,
          {
            download: true,
          },
        );

      return data?.signedUrl;
    }),
});
