import { auth, discordAuth } from "~/server/auth";
import { serializeCookie } from "lucia/utils";

import type { NextApiRequest, NextApiResponse } from "next";

// Redirect users to this page to sign in with Discord
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405);
  const authRequest = auth.handleRequest({ req, res });
  const session = await authRequest.validate();
  if (session) {
    // If already signed in, redirect to home page
    return res.status(302).setHeader("Location", "/").end();
  }
  const [url, state] = await discordAuth.getAuthorizationUrl();
  const stateCookie = serializeCookie("github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return res
    .status(302)
    .setHeader("Set-Cookie", stateCookie)
    .setHeader("Location", url.toString())
    .end();
};

export default handler;
