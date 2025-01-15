"use client";

import {
  Building,
  Home,
  Layers,
  MapPin,
  Package,
  ShoppingBasket,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarProps } from "@/app/interfaces";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function SidebarNavigation({
  viewMode,
  badgeValue,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  const linkStyles = (path: string, isMobile: boolean) =>
    cn(
      isMobile
        ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-colors"
        : "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
      isActive(path)
        ? isMobile
          ? "bg-muted text-foreground"
          : "bg-muted text-primary"
        : "text-muted-foreground hover:text-primary"
    );

  const links = [
    { href: "/dashboard/overviews", label: "Ringkasan", icon: Home },
    {
      href: "/dashboard/categories",
      label: "Kategori",
      icon: Layers,
    },
    {
      href: "/dashboard/locations",
      label: "Lokasi",
      icon: MapPin,
    },
    {
      href: "/dashboard/brands",
      label: "Merek",
      icon: Building,
    },
    {
      href: "/dashboard/products",
      label: "Produk",
      icon: Package,
    },
    {
      href: "/dashboard/orders",
      label: "Pesanan",
      icon: ShoppingCart,
      badge: badgeValue?.orders,
    },
    {
      href: "/dashboard/customers",
      label: "Pelanggan",
      icon: Users,
      badge: badgeValue?.customers,
    },
  ];

  return (
    <>
      {viewMode === "mobile" && (
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <ShoppingBasket className="h-6 w-6" />
            <span>Toserba</span>
          </Link>
          {links.map(({ href, label, badge, icon: Icon }) => (
            <Link key={href} href={href} className={linkStyles(href, true)}>
              <Icon className="h-5 w-5" />
              {label}
              {badge != null && badge !== 0 && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      )}
      {viewMode === "website" && (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {links.map(({ href, label, badge, icon: Icon }) => (
            <Link key={href} href={href} className={linkStyles(href, false)}>
              <Icon className="h-4 w-4" />
              {label}
              {badge != null && badge !== 0 && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
