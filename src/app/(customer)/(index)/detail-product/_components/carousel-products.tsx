"use client";

import { CarouselProductsProps } from "@/app/interfaces";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function CarouselProducts({ images }: CarouselProductsProps) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="container max-w-[1130px] mx-auto mt-4 flex items-center justify-between"
    >
      <CarouselContent className="-ml-2">
        {images.map((image, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="bg-white w-[350px] h-[300px] p-10 shrink-0 border border-[#E5E5E5] rounded-[30px] overflow-hidden">
              <Image
                width={350}
                height={300}
                src={image}
                className="w-full h-full object-contain"
                alt="thumbnail"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
