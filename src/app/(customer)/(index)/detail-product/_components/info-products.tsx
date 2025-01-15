import { InfoProductsProps } from "@/app/interfaces";
import CardPriceInfoProduct from "./card-price-info-product";
import CardReviewItem from "./card-review-item";

export default function InfoProducts({
  item,
  description,
  benefits,
  reviews,
  isLoggedIn,
}: InfoProductsProps) {
  return (
    <div
      id="details-info"
      className="container max-w-[1130px] mx-auto flex justify-between gap-5 mt-[50px]"
    >
      <div className="max-w-[650px] w-full flex flex-col gap-[30px]">
        <div id="about" className="flex flex-col gap-[10px]">
          <h3 className="font-semibold">Tentang Produk</h3>
          <p className="leading-[32px]">{description}</p>
        </div>
        <div id="testi" className="flex flex-col gap-[10px]">
          <h3 className="font-semibold">Ulasan Produk</h3>
          <div className="grid grid-cols-2 gap-5">
            {reviews.map((review, index) => (
              <CardReviewItem
                key={index}
                rating={review.rating}
                description={review.description}
                photo={review.photo}
                userName={review.userName}
                date={review.date}
              />
            ))}
          </div>
        </div>
      </div>
      <CardPriceInfoProduct
        isLoggedIn={isLoggedIn}
        item={item}
        benefits={benefits}
      />
    </div>
  );
}
