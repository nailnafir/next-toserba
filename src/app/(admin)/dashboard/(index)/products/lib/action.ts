"use server";

import { schemaProducts } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { deleteFile, uploadFile } from "@/lib/supabase";
import { ProductStock } from "@prisma/client";
import { z } from "zod";

export async function CreateProducts(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaProducts.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    categoryId: formData.get("categoryId"),
    brandId: formData.get("brandId"),
    locationId: formData.get("locationId"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  });

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
    };
  }

  const selectedImages = validate.data?.images as File[];
  const uploadedFiles = await uploadFile(selectedImages, "products");
  const fileNames = uploadedFiles.map((file) => (file?.path.split("/").pop() as string));

  try {
    await prisma.product.create({
      data: {
        name: validate.data.name,
        description: validate.data.description,
        categoryId: Number.parseInt(validate.data.categoryId),
        brandId: Number.parseInt(validate.data.brandId),
        locationId: Number.parseInt(validate.data.locationId),
        price: Number.parseInt(validate.data.price),
        stock: validate.data.stock as ProductStock,
        images: fileNames,
      },
    });
  } catch (error) {
    console.error("Failed to create brand", error);
    await deleteFile(fileNames, "products");

    return {
      message: "Terjadi kesalahan pada 'tambah' data",
    };
  }

  return redirect("/dashboard/products");
}

export async function UpdateProducts(
  _: unknown,
  formData: FormData,
  id: number | null | undefined
): Promise<ActionResult> {
  const validate = schemaProducts
    .extend({
      id: z.number({ required_error: "Produk ID harus diisi" }),
    })
    .omit({ images: true })
    .safeParse({
      id: id,
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
      categoryId: formData.get("categoryId"),
      brandId: formData.get("brandId"),
      locationId: formData.get("locationId"),
      stock: formData.get("stock"),
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
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) {
      return {
        message: "Produk tidak ditemukan",
      };
    }

    const selectedImages = formData.getAll("images") as File[];
    let fileNames = [];

    if (selectedImages.length === 3) {
      const validateImage = schemaProducts
        .pick({
          images: true,
        })
        .safeParse({
          images: selectedImages,
        });

      if (!validateImage) {
        return {
          message: "Terjadi kesalahan mengunggah file gambar",
        };
      }

      const uploadedFileNames = await uploadFile(selectedImages, "products");
      fileNames = uploadedFileNames.map(
        (file) => file?.path.split("/").pop() as string
      );
    } else {
      fileNames = product.images;
    }

    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
        description: validate.data.description,
        categoryId: Number.parseInt(validate.data.categoryId),
        brandId: Number.parseInt(validate.data.brandId),
        locationId: Number.parseInt(validate.data.locationId),
        price: Number.parseInt(validate.data.price),
        stock: validate.data.stock as ProductStock,
        images: fileNames,
      },
    });
  } catch (error) {
    console.log("Failed to update product", error);

    return {
      message: "Terjadi kesalahan pada 'ubah' data",
    };
  }

  return redirect("/dashboard/products");
}

export async function DeleteProducts(
  _: unknown,
  id: number | null | undefined
): Promise<ActionResult> {
  if (id === undefined || id === null) {
    return {
      message: "Pengguna dengan ID tersebut tidak ditemukan",
    };
  }

  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
      select: {
        images: true,
      },
    });

    if (!product) {
      return {
        message: "Produk tidak ditemukan",
      };
    }

    const fileNames = product.images;

    await deleteFile(fileNames, "products");

    await prisma.product.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log("Failed to delete product", error);

    return {
      message: "Terjadi kesalahan pada 'hapus' data",
    };
  }

  redirect("/dashboard/products");
}
