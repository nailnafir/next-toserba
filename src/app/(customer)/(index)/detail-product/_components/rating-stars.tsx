import { RatingStarsProps } from "@/app/interfaces";
import { numberFormat } from "@/lib/utils";
import Image from "next/image";

export default function RatingStars({ rating, totalRating }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="shrink-0 flex">
            <Image
              src={`/assets/icons/${index < rating ? "Star" : "Star-gray"}.svg`}
              width={24}
              height={24}
              alt={`${index < rating ? "Star" : "Star-gray"}`}
            />
          </div>
        ))}
      </div>
      {totalRating && (
        <p className="font-semibold">{`(${numberFormat(totalRating)})`}</p>
      )}
    </div>
  );
}
