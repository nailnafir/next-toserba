import {
  Ban,
  Bath,
  Cable,
  Car,
  CookingPot,
  Drum,
  Dumbbell,
  NotebookPen,
  Pill,
  Shapes,
  Shirt,
  Tickets,
  Utensils,
  Weight,
  Wrench,
} from "lucide-react";
import prisma from "../../../../../lib/prisma";
import { getImageURL } from "@/lib/supabase";
import { GetProductsProps } from "@/app/interfaces";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const categoryIcons: Record<string, typeof Ban> = {
      "makanan & minuman": Utensils,
      "elektronik & aksesoris": Cable,
      pakaian: Shirt,
      "kosmetik & obat": Pill,
      "kupon digital & tiket": Tickets,
      "logam mulia": Weight,
      otomotif: Car,
      mainan: Shapes,
      olahraga: Dumbbell,
      "alat musik": Drum,
      "alat perkakas": Wrench,
      "alat tulis": NotebookPen,
      "perlengkapan dapur": CookingPot,
      "perlengkapan mandi": Bath,
    };

    const data = categories.map(({ id, name, _count: { products = 0 } }) => ({
      id,
      name,
      countProducts: products,
      icon: categoryIcons[name.toLowerCase()] || Ban,
    }));

    return data;
  } catch (error) {
    console.log(`Get Categories Error: ${error}`);
    return [];
  }
}

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const data = brands.map((brand) => ({
      ...brand,
      imageURL: getImageURL(brand.logo, "brands").publicUrl,
    }));

    return data;
  } catch (error) {
    console.log(`Get Brands Error: ${error}`);
    return [];
  }
}

export async function getLocations() {
  try {
    const locations = await prisma.location.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return locations;
  } catch (error) {
    console.log(`Get Locations Error: ${error}`);
    return [];
  }
}

export async function getProducts({ sortBy, orderBy }: GetProductsProps) {
  try {
    const products = await prisma.product.findMany({
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
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
      orderBy: {
        [orderBy]: sortBy,
      },
    });

    const data = products.map((product) => ({
      ...product,
      imageURL: getImageURL(product.images[0], "products").publicUrl,
    }));

    return data;
  } catch (error) {
    console.log(`Get Products Error: ${error}`);
    return [];
  }
}
