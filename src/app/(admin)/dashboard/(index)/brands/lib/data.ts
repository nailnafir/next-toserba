import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({});

    return brands;
  } catch (error) {
    console.log(`Get Brands Error: ${error}`);
    return [];
  }
}

export async function getBrandsById(id: string) {
  try {
    const brands = await prisma.brand.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });

    return brands;
  } catch (error) {
    console.log(`Get Brands By Id Error: ${error}`);
    return redirect("/dashboard/brands");
  }
}
