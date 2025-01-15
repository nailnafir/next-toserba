"use server";

import { getUser, lucia } from "@/lib/auth";
import { ActionResult } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignOut(): Promise<ActionResult> {
  const { session, user } = await getUser();

  if (!session) {
    return {
      message: "Tidak sah",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  console.log(`Keluar dari akun "${user.name}"`);

  return redirect("/dashboard/sign-in");
}
