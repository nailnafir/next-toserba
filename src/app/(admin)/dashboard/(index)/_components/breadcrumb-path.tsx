"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function BreadcrumbPath() {
  const pathname = usePathname();

  const paths = pathname.split("/").filter((segment) => segment);
  
  const translations: Record<string, string> = {
    dashboard: "Beranda",
    overviews: "Ringkasan",
    categories: "Kategori",
    locations: "Lokasi",
    brands: "Merek",
    products: "Produk",
    orders: "Pesanan",
    customers: "Pelanggan",
    add: "Tambah",
    edit: "Ubah",
  };

  const translateSegment = (segment: string): string => {
    return translations[segment] || segment;
  };

  const basePath = "/";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={basePath}>Halaman Utama</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {paths.map((segment, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          return (
            <Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <p>{translateSegment(segment)}</p>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{translateSegment(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}

      </BreadcrumbList>
    </Breadcrumb>
  );
}
