import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({});
    
    return categories;
  } catch (error) {
    console.log(`Get Categories Error: ${error}`);
    return [];
  }
}

export async function getCategoriesById(id: string) {
  try {
    const categories = await prisma.category.findFirst({
      where: { 
        id: Number.parseInt(id)
       },
    });
    
    return categories;
  } catch (error) {
    console.log(`Get Categories By Id Error: ${error}`);
    return redirect("/dashboard/categories");
  }
}