"use client";

import Link from "next/link";
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
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionResult } from "@/types";
import { useFormState } from "react-dom";
import { CreateCategories, UpdateCategories } from "../lib/action";
import { FormCategoriesProps } from "@/app/interfaces";
import { useToast } from "@/hooks/use-toast";
import CategoriesButton from "./categories-button";

const initialState: ActionResult = {
  message: "",
};

export default function CategoriesForm({ data, type }: FormCategoriesProps) {
  const UpdateCategoriesWithId = (_: unknown, formData: FormData) =>
    UpdateCategories(_, formData, data?.id);

  const { toast } = useToast();

  const [state, formAction] = useFormState(
    type === "add" ? CreateCategories : UpdateCategoriesWithId,
    initialState
  );

  if (state.message) {
    toast({
      variant: "destructive",
      title: "Kesalahan",
      description: state.message,
    });
  }

  return (
    <form action={formAction} className="flex flex-1 flex-col lg:p-4 p-2 gap-4">
      <div className="flex flex-row items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/dashboard/categories">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          kelola Kategori
        </h1>
        <Badge
          variant="outline"
          className="ml-auto bg-primary text-white sm:ml-0"
        >
          {type === "add" ? "Tambah" : "Ubah"}
        </Badge>
        <div className="hidden items-end gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/categories">Batal</Link>
          </Button>
          <CategoriesButton buttonType="save" />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Detail Kategori</CardTitle>
            <CardDescription>
              Harap isi data dengan lengkap untuk detail kategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nama Kategoriku...."
                  className="w-full"
                  defaultValue={data?.name}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-end gap-2 md:hidden">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/categories">Batal</Link>
        </Button>
        <CategoriesButton buttonType="save" />
      </div>
    </form>
  );
}
