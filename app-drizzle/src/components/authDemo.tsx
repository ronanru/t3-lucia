import Link from "next/link";
import LogOutButton from "~/components/logOutButton";
import { getPageSession } from "~/server/auth";

export async function AuthDemo() {
  const session = await getPageSession();
  return (
    <section>
      {session ? (
        <>
          <p>You are logged in as {session.user.username}</p>
          <LogOutButton />
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <Link href="/api/auth/discord/signin">Sign in</Link>
        </>
      )}
    </section>
  );
}
