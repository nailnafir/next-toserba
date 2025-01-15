import Link from "next/link";
import CardProductItem from "./card-product-item";
import { getProducts } from "../lib/data";
import { SectionProductsProps } from "@/app/interfaces";

export default async function SectionProducts({
  title,
  orderBy,
  sortBy,
}: SectionProductsProps) {
  const products = await getProducts({
    orderBy: orderBy ?? "createdAt",
    sortBy: sortBy ?? "desc",
  });

  return (
    <div id="picked" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <div className="w-64">
          <h2 className="font-bold text-2xl leading-[34px] whitespace-normal">
            {title}
          </h2>
        </div>
        <Link
          href="/catalogs"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-[30px]">
        {products.map((product) =>
          CardProductItem({
            id: product.id,
            name: product.name,
            imageURL: product.imageURL,
            categoryName: product.category.name,
            locationName: product.location.name,
            price: Number(product.price),
          })
        )}
      </div>
    </div>
  );
}
