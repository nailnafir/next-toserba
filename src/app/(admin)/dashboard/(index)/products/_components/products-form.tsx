"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionResult } from "@/types";
import { useFormState } from "react-dom";
import { FormProductsProps } from "@/app/interfaces";
import ProductsFileInput from "./products-files-input";
import { CreateProducts, UpdateProducts } from "../lib/action";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import ProductsButton from "./products-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState: ActionResult = {
  message: "",
};

export default function ProductsForm({ data, type, children }: FormProductsProps) {
  const UpdateProductsWithId = (_: unknown, formData: FormData) =>
    UpdateProducts(_, formData, data?.id);

  const [state, formAction] = useFormState(
    type === "add" ? CreateProducts : UpdateProductsWithId,
    initialState
  );

  return (
    <form
      action={formAction}
      className="mx-auto grid w-full lg:p-4 p-2 flex-1 auto-rows-max gap-4"
    >
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Kelola Produk
        </h1>
        <Badge
          variant="outline"
          className="ml-auto bg-primary text-white sm:ml-0"
        >
          {type === "add" ? "Tambah" : "Ubah"}
        </Badge>
        <div className="hidden items-end gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/products">Batal</Link>
          </Button>
          <ProductsButton buttonType="save" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Detail Produk</CardTitle>
              <CardDescription>
                Harap isi data dengan lengkap untuk detail produk
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.message !== "" && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Kesalahan</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nama Produk</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full"
                    placeholder="Nama Produkku...."
                    defaultValue={data?.name}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="price">Harga Produk</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    className="w-full"
                    placeholder="Harga Produkku...."
                    defaultValue={`${data?.price}`}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Deskripsi Produk</Label>
                  <Textarea
                    id="description"
                    name="description"
                    className="min-h-32"
                    placeholder="Deskripsi Produkku...."
                    defaultValue={data?.description}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {children}
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Stok Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="stock">Stok Produk</Label>
                  <Select name="stock" defaultValue={data?.stock}>
                    <SelectTrigger id="stock" aria-label="Select stock">
                      <SelectValue placeholder="Pilih stok...." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ready">Tersedia</SelectItem>
                      <SelectItem value="preorder">Pesan Dahulu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <ProductsFileInput data={data} />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 md:hidden">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/products">Batal</Link>
        </Button>
        <ProductsButton buttonType="save" />
      </div>
    </form>
  );
}
