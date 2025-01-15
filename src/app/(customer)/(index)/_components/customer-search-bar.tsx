"use client";

import { useFilter } from "@/hooks/use-filter";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CustomerSearchBar() {
  const { setFilter } = useFilter();
  const [ search, setSearch ] = useState<string>("");

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        search: search,
      });
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [search, setFilter]);

  return (
    <form
      action=""
      className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300"
    >
      <input
        type="text"
        id=""
        name=""
        onChange={(e) => setSearch(e.target.value)}
        className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
        placeholder="Cari produk dengan nama, merk, kategori"
      />
      <button type="submit" className="flex shrink-0">
        <Image
          src="/assets/icons/search-normal.svg"
          width={24}
          height={24}
          alt="icon"
        />
      </button>
    </form>
  );
}
