import { CardProductCartItemProps } from "@/app/interfaces";
import { useCart } from "@/hooks/use-cart";
import { rupiahCurrencyFormat } from "@/lib/utils";
import Image from "next/image";

export default function CardProductCartItem({
  item,
}: CardProductCartItemProps) {
  const { decreaseQuantity, increaseQuantity, removeProduct } = useCart();

  return (
    <div className="product-total-card bg-white flex items-center justify-between p-5 rounded-[20px] border border-[#E5E5E5]">
      <div className="flex items-center w-[340px] gap-5">
        <div className="w-[120px] h-[70px] flex shrink-0 overflow-hidden items-center justify-center">
          <Image
            width={120}
            height={80}
            src={item.imageURL}
            className="w-full h-full object-contain"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold leading-[22px]">{item.name}</p>
          <p className="text-sm text-[#616369]">{item.categoryName}</p>
        </div>
      </div>
      <div className="w-[150px] flex flex-col gap-1">
        <p className="text-sm text-[#616369]">Harga</p>
        <p className="font-semibold text-[#0D5CD7] leading-[22px]">
          {rupiahCurrencyFormat(item.price)}
        </p>
      </div>
      <div className="w-[120px] flex flex-col gap-1">
        <p className="text-sm text-[#616369]">Jumlah</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            className="w-6 h-6 flex shrink-0"
          >
            <Image
              width={24}
              height={24}
              src="/assets/icons/minus-cirlce.svg"
              alt="minus"
            />
          </button>
          <p className="text-[#0D5CD7] font-semibold leading-[22px]">
            {item.quantity}
          </p>
          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            className="w-6 h-6 flex shrink-0"
          >
            <Image
              width={24}
              height={24}
              src="/assets/icons/add-circle.svg"
              alt="plus"
            />
          </button>
        </div>
      </div>
      <div className="w-[150px] flex flex-col gap-1">
        <p className="text-sm text-[#616369]">Total Harga</p>
        <p className="font-semibold text-[#0D5CD7] leading-[22px]">
          {rupiahCurrencyFormat(item.quantity * item.price)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => removeProduct(item.id)}
        className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
      >
        Hapus
      </button>
    </div>
  );
}
