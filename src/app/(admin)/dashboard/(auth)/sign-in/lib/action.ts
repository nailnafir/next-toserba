"use server";

import bcrypt from "bcrypt";
import { ActionResult } from "@/types";
import { schemaSignIn } from "@/lib/schema";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function SignIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  
  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
    };
  }

  const adminUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "superadmin",
    },
  });

  if (!adminUser) {
    return {
      message: "Pengguna tidak ditemukan",
    };
  }

  const customerUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "customer",
    },
  });

  if (customerUser) {
    return {
      message: "Pengguna tidak diizinkan",
    };
  }

  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    adminUser.password
  );

  if (!comparePassword) {
    return {
      message: "Password salah",
    };
  }

  const session = await lucia.createSession(adminUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  
  console.log(`Masuk sebagai "${adminUser.name}"`);

  return redirect("/dashboard/overviews");
}
