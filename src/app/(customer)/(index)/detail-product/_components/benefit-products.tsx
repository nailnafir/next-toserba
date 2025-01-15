import Image from "next/image";
import { Fragment } from "react";

export default function BenefitProducts() {
  const benefits = [
    { id: 1, icon: "star-outline", title: "Termasuk garansi resmi" },
    { id: 2, icon: "code-circle", title: "Bonus install OS baru" },
    { id: 3, icon: "like", title: "100% asli dari pabrik" },
    { id: 4, icon: "tag", title: "Gratis pajak seluruhnya" },
  ];

  return (
    <div
      id="details-benefits"
      className="container max-w-[1130px] mx-auto flex items-center gap-[50px] justify-center mt-[50px]"
    >
      {benefits.map((benefit, index) => (
        <Fragment key={benefit.id + benefit.title}>
          {index !== 0 && (
            <div className="border-[0.5px] border-[#E5E5E5] h-12"></div>
          )}
          <div className="flex items-center gap-[10px]">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
              <Image
                src={`/assets/icons/${benefit.icon}.svg`}
                width={24}
                height={24}
                alt={`icon-${benefit.icon}`}
              />
            </div>
            <div className="w-28">
              <p className="font-semibold text-sm whitespace-normal">
                {benefit.title}
              </p>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
