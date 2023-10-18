import { auth } from "~/server/auth";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => ctx.session?.user ?? null),
  logOut: protectedProcedure.mutation(async ({ ctx }) => {
    await auth.invalidateSession(ctx.session?.sessionId);
    ctx.authRequest.setSession(null);
  }),
});
