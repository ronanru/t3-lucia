import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { discord } from "@lucia-auth/oauth/providers";
import { mysql2 } from "@lucia-auth/adapter-mysql";

import { cache } from "react";
import * as context from "next/headers";

import { dbConnection } from "./db";
import { env } from "~/env.mjs";

/**
 * @see https://lucia-auth.com/basics/configuration/
 */
export const auth = lucia({
  adapter: mysql2(dbConnection, {
    // MySQL table names
    user: "app-drizzle_user",
    key: "app-drizzle_key",
    session: "app-drizzle_session",
  }),
  env: env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (databaseUser) => ({
    username: databaseUser.username,
    discordId: databaseUser.discord_id,
  }),
});

export const discordAuth = discord(auth, {
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  redirectUri: env.AUTH_URL + "/api/auth/discord/callback",
});

/**
 * Get auth session from a server component
 */
export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

export type Auth = typeof auth;
