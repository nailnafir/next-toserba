"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getImageURL } from "@/lib/supabase";
import { dateFormat, rupiahCurrencyFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown, Edit } from "lucide-react";
import { ProductsColumn } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ProductsButton from "./products-button";

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    size: 12,
    accessorKey: "id",
    header: "#",
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      return <div>{pageIndex * pageSize + row.index + 1}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Foto",
    cell: ({ row }) => {
      const products = row.original;
      const image = getImageURL(products.imageURL, "products");
      
      return (
        <Image src={image.publicUrl} alt="Produk" width={80} height={80} />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="flex flex-row items-start"
          onClick={() => {
            if (!column.getIsSorted()) {
              column.toggleSorting(false);
            } else if (column.getIsSorted() === "asc") {
              column.toggleSorting(true);
            } else {
              column.clearSorting();
            }
          }}
        >
          Nama
          {column.getIsSorted() === "asc" && (
            <ArrowUpAZ className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <ArrowDownAZ className="ml-2 h-4 w-4" />
          )}
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <button
          className="flex flex-row items-start"
          onClick={() => {
            if (!column.getIsSorted()) {
              column.toggleSorting(false);
            } else if (column.getIsSorted() === "asc") {
              column.toggleSorting(true);
            } else {
              column.clearSorting();
            }
          }}
        >
          Harga
          {column.getIsSorted() === "asc" && (
            <ArrowUpAZ className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <ArrowDownAZ className="ml-2 h-4 w-4" />
          )}
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </button>
      );
    },
    cell: ({ row }) => {
      const products = row.original;

      return <div>{rupiahCurrencyFormat(Number(products.price))}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <button
          className="flex flex-row items-start"
          onClick={() => {
            if (!column.getIsSorted()) {
              column.toggleSorting(false);
            } else if (column.getIsSorted() === "asc") {
              column.toggleSorting(true);
            } else {
              column.clearSorting();
            }
          }}
        >
          Stok
          {column.getIsSorted() === "asc" && (
            <ArrowUpAZ className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <ArrowDownAZ className="ml-2 h-4 w-4" />
          )}
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </button>
      );
    },
    cell: ({ row }) => {
      const products = row.original;

      const stock = products.stock === "ready" ? "Tersedia" : "Prapesan";
      const stockColor = products.stock === "ready" ? "bg-green-500" : "bg-yellow-500";

      return (
        <Badge variant="outline" className={stockColor}>
          {stock}
        </Badge>
      );
    },
  },
  {
    size: 12,
    accessorKey: "totalSales",
    header: ({ column }) => {
      return (
        <button
          className="flex flex-row items-start"
          onClick={() => {
            if (!column.getIsSorted()) {
              column.toggleSorting(false);
            } else if (column.getIsSorted() === "asc") {
              column.toggleSorting(true);
            } else {
              column.clearSorting();
            }
          }}
        >
          Terjual
          {column.getIsSorted() === "asc" && (
            <ArrowUpAZ className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <ArrowDownAZ className="ml-2 h-4 w-4" />
          )}
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <button
          className="flex flex-row items-start"
          onClick={() => {
            if (!column.getIsSorted()) {
              column.toggleSorting(false);
            } else if (column.getIsSorted() === "asc") {
              column.toggleSorting(true);
            } else {
              column.clearSorting();
            }
          }}
        >
          Waktu Dibuat
          {column.getIsSorted() === "asc" && (
            <ArrowUpAZ className="ml-2 h-4 w-4" />
          )}
          {column.getIsSorted() === "desc" && (
            <ArrowDownAZ className="ml-2 h-4 w-4" />
          )}
          {!column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </button>
      );
    },
    cell: ({ row }) => {
      const products = row.original;

      return <div>{dateFormat(products.createdAt)}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Kelola",
    id: "actions",
    cell: ({ row }) => {
      const products = row.original;

      return (
        <div className="space-x-2 flex flex-row items-center">
          <Button size="sm" asChild>
            <Link href={`/dashboard/products/edit/${products.id}`}>
              <Edit className="w-4 h-4" />
            </Link>
          </Button>
          <ProductsButton id={products.id} buttonType="delete" />
        </div>
      );
    },
  },
];
