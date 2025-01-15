import Image from "next/image";
import { ContainerReviewItemProps } from "@/app/interfaces";

export default function ContainerReviewItem({
  photo,
  userName,
  description,
}: ContainerReviewItemProps) {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="w-[50px] h-[50px] flex shrink-0 rounded-full overflow-hidden">
        <Image
          src={`${photo ?? "/assets/icons/user.png"}`}
          height={80}
          width={80}
          className="w-full h-full object-cover"
          alt="photo"
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="font-semibold text-sm leading-[22px]">{description}</p>
        <p className="text-xs leading-[18px]">{userName}</p>
      </div>
    </div>
  );
}
