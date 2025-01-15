"use server";

import { schemaBrands } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { deleteFile, uploadFile } from "@/lib/supabase";

export async function CreateBrands(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaBrands.safeParse({
    name: formData.get("name"),
    logo: formData.get("logo"),
  });

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
    };
  }

  try {
    const selectedImages = [validate.data?.logo as File];
    const uploadedFiles = await uploadFile(selectedImages, "brands");
    const fileNames = uploadedFiles.map(
      (file) => file?.path.split("/").pop() as string
    );
    const logo = fileNames[0];

    await prisma.brand.create({
      data: {
        name: validate.data.name,
        logo: logo,
      },
    });
  } catch (error) {
    console.log("Failed to create brand", error);

    return {
      message: "Terjadi kesalahan pada 'tambah' data",
    };
  }

  return redirect("/dashboard/brands");
}

export async function UpdateBrands(
  _: unknown,
  formData: FormData,
  id: number | null | undefined
): Promise<ActionResult> {
  const logo = formData.get("logo") as File;
  const shouldClearLogo = formData.get("clearLogo") === "yes";

  const validate = schemaBrands
    .pick({
      name: true,
    })
    .safeParse({
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
    const brand = await prisma.brand.findFirst({
      where: {
        id: id,
      },
      select: {
        logo: true,
      },
    });

    let fileNames = [brand?.logo as string];
    const selectedImage = [logo as File];

    if (selectedImage.map((file) => file.size > 0)) {
      const uploadedFiles = await uploadFile(selectedImage, "brands");
      fileNames = uploadedFiles.map(
        (file) => file?.path.split("/").pop() as string
      );
    }

    if (shouldClearLogo) {
      await deleteFile(fileNames, "brands");
    }

    await prisma.brand.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
        logo: "",
      },
    });
  } catch (error) {
    console.log("Failed to update brand", error);

    return {
      message: "Terjadi kesalahan pada 'ubah' data",
    };
  }

  return redirect("/dashboard/brands");
}

export async function DeleteBrands(
  _: unknown,
  id: number | null | undefined
): Promise<ActionResult> {
  if (id === undefined || id === null) {
    return {
      message: "Pengguna dengan ID tersebut tidak ditemukan",
    };
  }

  try {
    const brand = await prisma.brand.findFirst({
      where: {
        id: id,
      },
      select: {
        logo: true,
      },
    });

    if (!brand) {
      return {
        message: "Merek tidak ditemukan",
      };
    }

    const fileNames = [brand.logo];

    await deleteFile(fileNames, "brands");

    await prisma.brand.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log("Failed to delete brand", error);

    return {
      message: "Terjadi kesalahan pada 'hapus' data",
    };
  }

  redirect("/dashboard/brands");
}
