import Image from "next/image";
import RatingStars from "./rating-stars";
import { dateFormat } from "@/lib/utils";
import { CardReviewItemProps } from "@/app/interfaces";

export default function CardReviewItem({
  rating,
  description,
  photo,
  userName,
  date,
}: CardReviewItemProps) {
  return (
    <div className="testi-card flex flex-col bg-white p-5 gap-5 border border-[#E5E5E5] rounded-[20px] h-fit">
      <RatingStars rating={rating} />
      <p className="line-clamp-2 hover:line-clamp-none leading-[28px]">
        {description}
      </p>
      <div className="flex items-center gap-[10px]">
        <div className="w-[50px] h-[50px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
          <Image
            src={`${photo ?? "/assets/icons/user.png"}`}
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-full"
            alt="photo"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-semibold text-sm leading-[22px]">{userName}</p>
          <p className="text-xs leading-[18px]">{dateFormat(date)}</p>
        </div>
      </div>
    </div>
  );
}
