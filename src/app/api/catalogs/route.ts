import prisma from "../../../../lib/prisma";
import { CatalogsFilter } from "@/types";
import { Prisma } from "@prisma/client";
import { CardProductItemProps } from "@/app/interfaces";
import { getImageURL } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CatalogsFilter;

    const orQuery: Prisma.ProductWhereInput[] = [];

    if (body.search && body.search !== "") {
      orQuery.push({
        name: {
          contains: body.search,
          mode: "insensitive",
        },
      });
    }

    if (body.minimumPrice && body.minimumPrice > 0) {
      orQuery.push({
        price: {
          gte: body.minimumPrice,
        },
      });
    }

    if (body.maximumPrice && body.maximumPrice > 0) {
      orQuery.push({
        price: {
          lte: body.maximumPrice,
        },
      });
    }

    if (body.stocks && body.stocks?.length > 0) {
      orQuery.push({
        stock: {
          in: body.stocks,
        },
      });
    }

    if (body.brands && body.brands?.length > 0) {
      orQuery.push({
        brand: {
          id: {
            in: body.brands,
          },
        },
      });
    }

    if (body.categories && body.categories?.length > 0) {
      orQuery.push({
        category: {
          id: {
            in: body.categories,
          },
        },
      });
    }

    if (body.locations && body.locations?.length > 0) {
      orQuery.push({
        location: {
          id: {
            in: body.locations,
          },
        },
      });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: orQuery.length > 0 ? orQuery : undefined,
      },
      select: {
        id: true,
        images: true,
        name: true,
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
      },
    });

    const dataProducts: CardProductItemProps[] = products.map((product) => {
      return {
        id: product.id,
        categoryName: product.category.name,
        name: product.name,
        price: Number(product.price),
        locationName: product.location.name,
        imageURL: getImageURL(product.images[0], "products").publicUrl,
      };
    });

    return Response.json(dataProducts);
  } catch (error) {
    console.log("API Catalogs Error: ", error);
    
    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
