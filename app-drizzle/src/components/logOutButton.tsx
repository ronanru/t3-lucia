"use client";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();

  const logOut = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) return router.refresh();
  };

  return <button onClick={logOut}>Log out</button>;
}
