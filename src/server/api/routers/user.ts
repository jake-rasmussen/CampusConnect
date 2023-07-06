import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  isUserAdmin: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user?.isAdmin;
  }),
});
