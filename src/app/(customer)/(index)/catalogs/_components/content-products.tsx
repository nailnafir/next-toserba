"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilter } from "@/hooks/use-filter";
import CardProductItem from "../../_components/card-product-item";

export default function ContentProducts() {
  const { filter } = useFilter();
  const { data, isLoading } = useQuery({
    queryKey: ["list-products", filter],
    queryFn: () => fetchProducts(filter),
  });

  return (
    <div className="w-[780px] flex flex-col bg-white p-[30px] gap-[30px] h-fit border border-[#E5E5E5] rounded-[30px]">
      <h2 className="font-bold text-2xl leading-[34px]">Produk</h2>
      <div className="grid grid-cols-3 gap-[30px]">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className="bg-gray-300 h-64 rounded-[20px] w-full"
              />
            ))
          : data?.map((item) =>
              CardProductItem({
                id: item.id,
                name: item.name,
                imageURL: item.imageURL,
                categoryName: item.categoryName,
                locationName: item.locationName,
                price: item.price,
              })
            )}
      </div>
    </div>
  );
}
