"use server";

import { schemaLocations } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function CreateLocations(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaLocations.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
    };
  }

  try {
    await prisma.location.create({
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    return {
      message: "Terjadi kesalahan pada 'tambah' data",
    };
  }

  return redirect("/dashboard/locations");
}

export async function UpdateLocations(
  _: unknown,
  formData: FormData,
  id: number | null | undefined
): Promise<ActionResult> {
  const validate = schemaLocations.safeParse({
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
    await prisma.location.update({
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

  return redirect("/dashboard/locations");
}

export async function DeleteLocations(
  _: unknown,
  id: number | null | undefined
): Promise<ActionResult> {
  if (id === undefined || id === null) {
    return {
      message: "Pengguna dengan ID tersebut tidak ditemukan",
    };
  }

  try {
    await prisma.location.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      message: "Terjadi kesalahan pada 'hapus' data",
    };
  }

  return redirect("/dashboard/locations");
}
