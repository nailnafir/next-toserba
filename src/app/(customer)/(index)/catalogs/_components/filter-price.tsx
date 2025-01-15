"use client";

import { useFilter } from "@/hooks/use-filter";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FilterPrice() {
  const { setFilter } = useFilter();
  const [minimumPrice, setMinimumPrice] = useState<number>(0);
  const [maximumPrice, setMaximumPrice] = useState<number>(0);

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        minimumPrice: minimumPrice,
      });
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [minimumPrice, setFilter]);

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        maximumPrice: maximumPrice,
      });
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [maximumPrice, setFilter]);

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Range Harga</p>
      <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
        <div className="flex shrink-0">
          <Image
            src="/assets/icons/dollar-circle.svg"
            width={24}
            height={24}
            alt="icon"
          />
        </div>
        <input
          type="number"
          id=""
          name=""
          onChange={(e) => setMinimumPrice(Number(e.target.value))}
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Minimum price"
        />
      </div>
      <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
        <div className="flex shrink-0">
          <Image
            src="/assets/icons/dollar-circle.svg"
            width={24}
            height={24}
            alt="icon"
          />
        </div>
        <input
          type="number"
          id=""
          name=""
          onChange={(e) => setMaximumPrice(Number(e.target.value))}
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Maximum price"
        />
      </div>
    </div>
  );
}
