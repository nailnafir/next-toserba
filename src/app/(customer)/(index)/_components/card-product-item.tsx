import Link from "next/link";
import Image from "next/image";
import { CardProductItemProps } from "@/app/interfaces";
import { rupiahCurrencyFormat } from "@/lib/utils";

export default function CardProductItem({
  id,
  name,
  imageURL,
  categoryName,
  locationName,
  price,
}: CardProductItemProps) {
  return (
    <Link href={`/detail-product/${id}`} key={name + id} className="product-card">
      <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
        <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
          <Image
            width={350}
            height={300}
            src={imageURL}
            className="w-full h-full object-contain"
            alt="thumbnail"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-1">
            <p className="font-semibold leading-[22px] truncate">{name}</p>
            <p className="text-sm text-[#616369]">{categoryName}</p>
            <p className="text-sm text-[#616369]">{locationName}</p>
          </div>
          <p className="font-semibold text-[#0D5CD7] leading-[22px]">
            {rupiahCurrencyFormat(price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
