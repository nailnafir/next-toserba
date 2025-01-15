"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { OrdersColumn } from "@/types";
import { rupiahCurrencyFormat } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    size: 80,
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
    accessorKey: "products",
    header: "Produk",
    cell: ({ row }) => {
      const orders = row.original;

      return (
        <div className="flex flex-col gap-4 justify-start">
          {orders.products.map((item, index) => {
            return (
              <>
                <Image
                  key={index}
                  src={item.image}
                  alt="Produk"
                  width={40}
                  height={40}
                />
                <span>{item.name}</span>
              </>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "customerName",
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
          Nama Pelanggan
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
      return <div>{row.original.customerName}</div>;
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
      return <div>{rupiahCurrencyFormat(row.original.price)}</div>;
    },
  },
  {
    accessorKey: "status",
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
          Status
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
      const orders = row.original;
      const statusColor =
        orders.status === "success"
          ? "bg-green-500"
          : orders.status === "failed"
          ? "bg-red-500"
          : "bg-yellow-500";

      return (
        <Badge variant="outline" className={statusColor}>
          {orders.status}
        </Badge>
      );
    },
  },
];
