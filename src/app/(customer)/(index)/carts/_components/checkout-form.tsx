"use client";

import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { useMemo } from "react";
import ConcernProductItem from "../../_components/concern-product-item";
import { rupiahCurrencyFormat } from "@/lib/utils";
import { PackageOpen } from "lucide-react";
import { useFormState } from "react-dom";
import { CreateOrders } from "../lib/action";
import { ActionResult } from "@/types";
import Link from "next/link";
import PayButton from "./pay-button";

const initialState: ActionResult = {
  message: "",
};

export default function CheckoutForm() {
  const { products } = useCart();

  const { subTotal, insurance, shipping, tax, warranty, grandTotal } =
    useMemo(() => {
      const subTotal = products.reduce(
        (previous, current) => previous + current.price * current.quantity,
        0
      );

      const insurance = subTotal * 0.05;
      const tax = subTotal * 0.11;
      const shipping = products.length === 0 ? 0 : 80000;
      const warranty = products.length === 0 ? 0 : 25000;
      const grandTotal = subTotal + insurance + tax + shipping + warranty;

      return {
        subTotal: subTotal,
        insurance: insurance,
        tax: tax,
        shipping: shipping,
        warranty: warranty,
        grandTotal: grandTotal,
      };
    }, [products]);

  const detailFees = [
    {
      title: "Total Harga",
      value: subTotal,
    },
    {
      title: "Biaya Asuransi 5%",
      value: insurance,
    },
    {
      title: "Biaya Kirim",
      value: shipping,
    },
    {
      title: "Garansi Resmi",
      value: warranty,
    },
    {
      title: "Pajak 11%",
      value: tax,
    },
  ];

  const OrderParams = (_: unknown, formData: FormData) =>
    CreateOrders(_, formData, grandTotal, products);

  const [state, formAction] = useFormState(OrderParams, initialState);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center mt-20 mb-8">
        <PackageOpen className="w-60 h-60" />
        <h1 className="font-semibold text-[32px]">Keranjang Belanja Kosong</h1>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      id="checkout-info"
      className="container max-w-[1130px] mx-auto flex justify-between gap-5 mt-[80px] pb-[100px]"
    >
      {state.message !== "" && (
        <p className="font-semibold text-red-500 bg-white">{state.message}</p>
      )}
      <div className="w-[650px] flex flex-col shrink-0 gap-4 h-fit">
        <h2 className="font-bold text-2xl leading-[34px]">Alamat Pengiriman</h2>
        <div className="flex flex-col gap-5 p-[30px] rounded-3xl border border-[#E5E5E5] bg-white">
          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                width={24}
                height={24}
                src="/assets/icons/profile-circle.svg"
                alt="icon"
              />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Ketik nama lengkap"
            />
          </div>
          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                width={24}
                height={24}
                src="/assets/icons/house-2.svg"
                alt="icon"
              />
            </div>
            <input
              type="text"
              id="address"
              name="address"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="ketik alamat lengkap"
            />
          </div>
          <div className="flex items-center gap-[30px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <Image
                  width={24}
                  height={24}
                  src="/assets/icons/global.svg"
                  alt="icon"
                />
              </div>
              <input
                type="text"
                id="city"
                name="city"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Masukkan nama kota"
              />
            </div>
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <Image
                  width={24}
                  height={24}
                  src="/assets/icons/location.svg"
                  alt="icon"
                />
              </div>
              <input
                type="number"
                id="postalCode"
                name="postalCode"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Masukkan kode pos"
              />
            </div>
          </div>
          <div className="flex items-start gap-[10px] rounded-[20px] border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                width={24}
                height={24}
                src="/assets/icons/note.svg"
                alt="icon"
              />
            </div>
            <textarea
              name="notes"
              id="notes"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black resize-none"
              rows={6}
              placeholder="Ketik catatan untuk pengirim"
            ></textarea>
          </div>
          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                width={24}
                height={24}
                src="/assets/icons/call.svg"
                alt="icon"
              />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Ketik nomor telepon"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col shrink-0 gap-4 h-fit">
        <h2 className="font-bold text-2xl leading-[34px]">Detail Pembayaran</h2>
        <div className="w-full bg-white border border-[#E5E5E5] flex flex-col gap-[30px] p-[30px] rounded-3xl">
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
                  <p className="font-semibold">100% Produk Asli</p>
                  <p className="text-sm">Kami tidak menjual produk palsu</p>
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
          <div className="flex flex-col gap-4">
            {detailFees.map((fee, index) => (
              <ConcernProductItem
                key={index}
                title={fee.title}
                value={fee.value}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Total Biaya</p>
            <p className="font-bold text-[32px] leading-[48px] underline text-[#0D5CD7]">
              {rupiahCurrencyFormat(grandTotal)}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <PayButton />
            <Link
              href="#"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
            >
              Kontak Bantuan
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
