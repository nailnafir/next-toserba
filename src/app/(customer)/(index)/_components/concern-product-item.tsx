import { ConcernProductItemProps } from "@/app/interfaces";
import { rupiahCurrencyFormat } from "@/lib/utils";
import Image from "next/image";

export default function ConcernProductItem({
  title,
  value,
}: ConcernProductItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex shrink-0">
          <Image
            width={24}
            height={24}
            src="/assets/icons/tick-circle.svg"
            alt="icon"
          />
        </div>
        <p>{title}</p>
      </div>
      {value && <p className="font-semibold">{rupiahCurrencyFormat(value)}</p>}
    </div>
  );
}
