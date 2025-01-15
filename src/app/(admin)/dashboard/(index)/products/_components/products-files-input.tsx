"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { FormProductsProps } from "@/app/interfaces";
import { getImageURL } from "@/lib/supabase";
import Image from "next/image";
import svgUploadProduct from "../../../../../../../public/assets/thumbnails/upload_products.svg";

export default function ProductsFileInput({ data }: FormProductsProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const thumbnailImageRef = useRef<HTMLImageElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);

  const onClickInput = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    if (
      !thumbnailImageRef.current ||
      !image1Ref.current ||
      !image2Ref.current
    ) {
      return;
    }

    if (e.target.files && e.target.files.length >= 3) {
      thumbnailImageRef.current.src = URL.createObjectURL(e.target.files[0]);
      image1Ref.current.src = URL.createObjectURL(e.target.files[1]);
      image2Ref.current.src = URL.createObjectURL(e.target.files[2]);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Foto Produk</CardTitle>
        <CardDescription>
          Pilih 3 foto produk terbaikmu yang ingin diunggah
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            ref={thumbnailImageRef}
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={
              data?.images
                ? getImageURL(data?.images[0], "products")
                : svgUploadProduct
            }
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            <button>
              <Image
                ref={image1Ref}
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src={
                  data?.images
                    ? getImageURL(data?.images[1], "products")
                    : svgUploadProduct
                }
                width="84"
              />
            </button>
            <button>
              <Image
                ref={image2Ref}
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src={
                  data?.images
                    ? getImageURL(data?.images[2], "products")
                    : svgUploadProduct
                }
                width="84"
              />
            </button>
            <button
              type="button"
              onClick={onClickInput}
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </button>
            <input
              ref={fileRef}
              onChange={onChangeInput}
              type="file"
              name="images"
              className="hidden"
              accept="images/*"
              multiple
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
