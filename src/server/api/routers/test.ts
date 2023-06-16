import { createTRPCRouter, protectedProcedure } from "../trpc";

export const protectedRouter = createTRPCRouter({
  protectedRoute: protectedProcedure.query(({ ctx }) => {
    return {
      secret: `\n${ctx.auth?.userId} is using a protected procedure`,
    };
  }),
});
