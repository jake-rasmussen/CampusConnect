import { z } from "zod";

import { createTRPCRouter, isEvaluator, t } from "../trpc";

export const applicationSubmissionCommentRouter = createTRPCRouter({
  // Procedure to create a comment linked to a specific application submission evaluation
  createApplicationSubmissionComment: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        applicationSubmissionEvaluationId: z.string(),
        comment: z.string(),
      }),
    )
    .use(isEvaluator)
    .mutation(async ({ ctx, input }) => {
      const { projectId, applicationSubmissionEvaluationId, comment } = input;

      return ctx.prisma.applicationSubmissionComment.create({
        data: {
          comment,
          applicationSubmissionEvaluationId,
          memberProjectId: projectId,
          memberUserId: ctx.user.userId,
        },

      });
    }),
  deleteApplicationSubmissionComment: t.procedure
    .input(
      z.object({
        projectId: z.string(),
        applicationSubmissionEvaluationId: z.string(),
      })
    )
    .use(isEvaluator)
    .mutation(async ({ ctx, input }) => {
      const { projectId, applicationSubmissionEvaluationId } = input;

      const comment = await ctx.prisma.applicationSubmissionComment.findFirst({
        where: {
          applicationSubmissionEvaluationId,
          memberUserId: ctx.user.userId,
          memberProjectId: projectId,
        },
      });

      if (!comment) {
        throw new Error("Comment not found or you are not authorized to delete this comment.");
      }

      return ctx.prisma.applicationSubmissionComment.delete({
        where: {
          id: comment.id,
        },
      });
    })
});
