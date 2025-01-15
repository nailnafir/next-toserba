import prisma from "../../../../../../lib/prisma";
import { redirect } from "next/navigation";
import { getImageURL } from "@/lib/supabase";

export async function getProductById(id: number) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        images: true,
        description: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    if (!product) {
      return redirect("/");
    }

    return {
      ...product,
      images: product.images.map((image) => {
        return getImageURL(image, "products").publicUrl;
      }),
    };
  } catch (error) {
    console.log(`Get Product By Id Error ${error}`);

    return null;
  }
}
