"use server";

import { schemaCategories } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function CreateCategories(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaCategories.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
    };
  }

  try {
    await prisma.category.create({
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    return {
      message: "Terjadi kesalahan pada 'tambah' data",
    };
  }

  return redirect("/dashboard/categories");
}

export async function UpdateCategories(
  _: unknown,
  formData: FormData,
  id: number | null | undefined
): Promise<ActionResult> {
  const validate = schemaCategories.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
    };
  }

  if (id === undefined || id === null) {
    return {
      message: "Pengguna dengan ID tersebut tidak ditemukan",
    };
  }

  try {
    await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    return {
      message: "Terjadi kesalahan pada 'ubah' data",
    }
  }

  return redirect("/dashboard/categories");
}

export async function DeleteCategories(
  _: unknown,
  id: number | null | undefined
): Promise<ActionResult> {
  if (id === undefined || id === null) {
    return {
      message: "Pengguna dengan ID tersebut tidak ditemukan",
    };
  }

  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      message: "Terjadi kesalahan pada 'hapus' data",
    };
  }

  return redirect("/dashboard/categories");
}
