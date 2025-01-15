"use client";

import Link from "next/link";
import Image from "next/image";
import { rupiahCurrencyFormat } from "@/lib/utils";
import { CardPriceInfoProductProps } from "@/app/interfaces";
import { useCart } from "@/hooks/use-cart";
import { CartProduct } from "@/types";
import { useRouter } from "next/navigation";
import ConcernProductItem from "../../_components/concern-product-item";

export default function CardPriceInfoProduct({
  item,
  benefits,
  isLoggedIn,
}: CardPriceInfoProductProps) {
  const { addProduct } = useCart();

  const router = useRouter();

  const checkout = () => {
    const newCart: CartProduct = {
      ...item,
      quantity: 1,
    };

    addProduct(newCart);

    router.push("/carts");
  };

  return (
    <div className="w-[302px] flex flex-col shrink-0 gap-5 h-fit">
      <div className="w-full bg-white border border-[#E5E5E5] flex flex-col gap-[30px] p-[30px] rounded-3xl">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Harga Baru</p>
          <p className="font-bold text-[32px] leading-[48px]">
            {rupiahCurrencyFormat(Number(item.price))}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {benefits.map((benefit, index) => (
            <ConcernProductItem key={index} title={benefit} />
          ))}
        </div>
        {isLoggedIn && (
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={checkout}
              className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
            >
              Masukkan Keranjang
            </button>
            <Link
              href="#"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
            >
              Simpan
            </Link>
          </div>
        )}
      </div>
      <Link href="#">
        <div className="w-full bg-white border border-[#E5E5E5] flex items-center justify-between gap-2 p-5 rounded-3xl">
          <div className="flex items-center gap-[10px]">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
              <Image
                width={24}
                height={24}
                src="/assets/icons/cake.svg"
                alt="icon"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold">Beli Untuk Hadiah</p>
              <p className="text-sm">Gratis Pengiriman</p>
            </div>
          </div>
          <div className="flex shrink-0">
            <Image
              width={24}
              height={24}
              src="/assets/icons/arrow-right.svg"
              alt="icon"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
