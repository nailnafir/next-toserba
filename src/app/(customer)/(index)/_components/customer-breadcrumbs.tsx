"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getPathname(name: string) {
  if (name.includes("catalogs")) {
    return "Katalog";
  } else if (name.includes("detail-product")) {
    return "Detail";
  } else if (name.includes("carts")) {
    return "Keranjang";
  } else {
    return "???";
  }
}

export default function CustomerBreadcrumbs() {
  const path = usePathname();

  return (
    <div className="flex gap-5 items-center">
      <Link href="/shop" className="page text-sm text-[#6A7789] hover:text-black">
        Toko
      </Link>
      <span className="text-sm text-[#6A7789]">/</span>
      <Link href="/catalogs" className="page text-sm text-[#6A7789] hover:text-black">
        Jelajahi
      </Link>
      <span className="text-sm text-[#6A7789]">/</span>
      <div className="page text-sm text-black">
        {getPathname(path)}
      </div>
    </div>
  );
}
