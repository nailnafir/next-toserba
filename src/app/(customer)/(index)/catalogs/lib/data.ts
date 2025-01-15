import { CardProductItemProps } from "@/app/interfaces";
import { CatalogsFilter } from "@/types";

export async function fetchProducts(
  body?: CatalogsFilter
): Promise<CardProductItemProps[]> {
  const response = await fetch("/api/catalogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body ?? {}),
  });

  const data = await response.json();

  return data ?? [];
}
