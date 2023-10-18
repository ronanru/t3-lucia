import Link from "next/link";
import { api } from "~/utils/api";

export default function AuthDemo() {
  const userQuery = api.auth.getUser.useQuery();
  const logOutMutation = api.auth.logOut.useMutation();
  const utils = api.useContext();

  const logOut = async () => {
    await logOutMutation.mutateAsync();
    await utils.auth.getUser.invalidate();
  };

  return (
    <section>
      {userQuery.data ? (
        <>
          <p>You are logged in as {userQuery.data.username}</p>
          <button onClick={logOut}>Log Out</button>
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
