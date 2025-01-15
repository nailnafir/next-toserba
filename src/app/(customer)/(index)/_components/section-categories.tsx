import Link from "next/link";
import { getCategories } from "../lib/data";

export default async function SectionCategories() {
  const categories = await getCategories();

  return (
    <div id="categories" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">
          Jelajahi Produk <br /> dengan Kategori
        </h2>
        <a
          href="catalog.html"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Lihat Semua
        </a>
      </div>
      <div className="grid grid-cols-4 gap-[30px]">
        {categories.map((category) => (
          <Link
            key={category.name + category.id}
            href=""
            className="categories-card"
          >
            <div className="bg-white flex items-center text-white gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
              <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
                {category.icon && <category.icon size={24} />}
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="font-semibold text-black leading-[22px] truncate">
                  {category.name}
                </p>
                <p className="text-sm text-[#616369]">
                  {category.countProducts + " Produk"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
