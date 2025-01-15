import { ProductsColumn } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { redirect } from "next/navigation";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        _count: {
          select: {
            orders: true,
          },
        },
        name: true,
        createdAt: true,
        price: true,
        stock: true,
        images: true,
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
    });

    const responseProducts: ProductsColumn[] = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        stock: product.stock,
        totalSales: product._count.orders,
        brandName: product.brand.name,
        categoryName: product.category.name,
        createdAt: product.createdAt,
        imageURL: product.images[0],
      };
    });

    return responseProducts;
  } catch (error) {
    console.log(`Get Products Error: ${error}`);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });

    return product;
  } catch (error) {
    console.log(`Get Products By Id Error: ${error}`);
    return redirect("/dashboard/products");
  }
}