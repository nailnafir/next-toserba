"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from "lucide-react";
import { getImageURL } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import BrandsButton from "./brands-button";

export const columns: ColumnDef<Brand>[] = [
  {
    size: 12,
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
    accessorKey: "logo",
    header: "Logo Merek",
    cell: ({ row }) => {
      const brands = row.original;
      const image = getImageURL(brands.logo, "brands");

      return (
        <Image src={image.publicUrl} alt="Produk" width={40} height={40} />
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
          Nama Merek
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
    size: 12,
    accessorKey: "actions",
    header: "Kelola",
    id: "actions",
    cell: ({ row }) => {
      const brands = row.original;

      return (
        <div className="space-x-2 flex flex-row items-center">
          <Button size="sm" asChild>
            <Link href={`/dashboard/brands/edit/${brands.id}`}>
              <Edit className="w-4 h-4" />
            </Link>
          </Button>
          <BrandsButton id={brands.id} buttonType="delete" />
        </div>
      );
    },
  },
];
