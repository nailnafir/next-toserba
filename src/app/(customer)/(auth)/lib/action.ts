"use server";

import bcrypt from "bcrypt";
import { ActionResult } from "@/types";
import { schemaSignIn, schemaSignUp } from "@/lib/schema";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../../../../../lib/prisma";

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

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "customer",
    },
  });

  if (!existingUser) {
    return {
      message: "Email tidak ditemukan",
    };
  }

  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser.password
  );

  if (!comparePassword) {
    return {
      message: "Password salah",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  console.log(`Masuk sebagai "${existingUser.name}"`);

  return redirect("/");
}

export async function SignUp(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaSignUp.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
    };
  }

  const isRegisteredUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "customer",
    },
  });

  if (isRegisteredUser) {
    return {
      message: "Email sudah terdaftar",
    };
  }

  const saltRounds = 12;
  const hashedPassword = bcrypt.hashSync(validate.data.password, saltRounds);

  const createdUser = await prisma.user.create({
    data: {
      name: validate.data.name,
      email: validate.data.email,
      password: hashedPassword,
      role: "customer",
    },
  });

  console.log(`Daftar sebagai "${createdUser.name}"`);

  return redirect("/sign-in");
}
