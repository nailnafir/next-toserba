"use client";

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
import { ChevronLeft, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionResult } from "@/types";
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { FormBrandsProps } from "@/app/interfaces";
import { CreateBrands, UpdateBrands } from "../lib/action";
import BrandsButton from "./brands-button";
import Link from "next/link";
import Image from "next/image";
import { getImageURL } from "@/lib/supabase";
import { useRef, useState } from "react";

const initialState: ActionResult = {
  message: "",
};

export default function BrandsForm({ data, type }: FormBrandsProps) {
  const UpdateBrandsWithId = (_: unknown, formData: FormData) =>
    UpdateBrands(_, formData, data?.id);

  const { toast } = useToast();

  const [state, formAction] = useFormState(
    type === "add" ? CreateBrands : UpdateBrandsWithId,
    initialState
  );

  const [hasLogo, setHasLogo] = useState(!!data?.logo);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClearLogo = async () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    formData.set("clearLogo", "yes");

    try {
      setHasLogo(false);
    } catch (error) {
      console.error("Error clearing logo:", error);
      toast({
        variant: "destructive",
        title: "Kesalahan",
        description: "Gagal menghapus logo",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHasLogo(true);
    }
  };

  if (state.message) {
    toast({
      variant: "destructive",
      title: "Kesalahan",
      description: state.message,
    });
  }

  return (
    <form
      action={formAction}
      ref={formRef}
      className="flex flex-1 flex-col lg:p-4 p-2 gap-4"
    >
      <div className="flex flex-row items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/dashboard/brands">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Kelola Merek
        </h1>
        <Badge
          variant="outline"
          className="ml-auto bg-primary text-white sm:ml-0"
        >
          {type === "add" ? "Tambah" : "Ubah"}
        </Badge>
        <div className="hidden items-end gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/brands">Batal</Link>
          </Button>
          <BrandsButton buttonType="save" />
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Detail Merek</CardTitle>
            <CardDescription>
              Harap isi data dengan lengkap untuk detail merek
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {hasLogo && data?.logo ? (
                <div className="grid gap-3">
                  <Label htmlFor="image-logo">Logo</Label>
                  <div className="relative border rounded p-4 w-64">
                    <Image
                      id="image-logo"
                      src={getImageURL(data?.logo, "brands").publicUrl}
                      alt="Logo"
                      width={250}
                      height={250}
                      className="rounded-md object-cover"
                    />
                    <div
                      className="absolute -top-4 -right-4 h-8 w-8 rounded border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
                      onClick={handleClearLogo}
                    >
                      <X className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Label htmlFor="logo">Logo</Label>
                  <Input
                    id="logo"
                    type="file"
                    name="logo"
                    accept="image/*"
                    placeholder="Logo Merekku...."
                    className="w-full"
                    onChange={handleFileChange}
                    key={hasLogo ? "has-logo" : "no-logo"}
                  />
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nama Merekku...."
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
          <Link href="/dashboard/brands">Batal</Link>
        </Button>
        <BrandsButton buttonType="save" />
      </div>
    </form>
  );
}
