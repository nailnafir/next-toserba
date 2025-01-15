import CustomerBreadcrumbs from "../../_components/customer-breadcrumbs";
import CustomerNavigationBar from "../../_components/customer-navigation-bar";
import SectionProducts from "../../_components/section-products";
import BenefitProducts from "../_components/benefit-products";
import CarouselProducts from "../_components/carousel-products";
import InfoProducts from "../_components/info-products";
import RatingStars from "../_components/rating-stars";
import { Suspense } from "react";
import { getProductById } from "../lib/data";
import { DetailProductProps } from "@/app/interfaces";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export default async function DetailProduct({ params }: DetailProductProps) {
  const { session } = await getUser();
  const product = await getProductById(Number(params.id));

  if (!product) {
    return redirect("/");
  }

  const productInfo = {
    ...product,
    benefits: [
      "Harga Termurah",
      "Produk Berkualitas",
      "Pembayaran Mudah",
      "Pengiriman Cepat",
    ],
    reviews: [
      {
        rating: 3,
        description: `I do really love this product helped me to achieve my first million Lorem ipsum dolor sit amet.`,
        photo: null,
        userName: "Nailul Firdaus",
        date: new Date("2024-12-21T14:22:32.997"),
      },
      {
        rating: 4,
        description: `I do really love this product helped me to achieve my first million Lorem ipsum dolor sit amet.`,
        photo: null,
        userName: "Berliana Rizka",
        date: new Date("2024-12-22T14:22:32.997"),
      },
      {
        rating: 4,
        description: `I do really love this product helped me to achieve my first million Lorem ipsum dolor sit amet.`,
        photo: null,
        userName: "Asyraf Zayn Hafidz",
        date: new Date("2024-12-23T14:22:32.997"),
      },
    ],
  };

  return (
    <>
      <header className="bg-[#EFF3FA] pt-[30px] h-[480px] -mb-[310px]">
        <CustomerNavigationBar />
      </header>
      <div
        id="title"
        className="container max-w-[1130px] mx-auto flex items-center justify-between"
      >
        <div className="flex flex-col gap-5">
          <CustomerBreadcrumbs />
          <h1 className="font-bold text-4xl leading-9">{product.name}</h1>
        </div>
        <RatingStars
          rating={product._count.orders === 0 ? 0 : 3}
          totalRating={product._count.orders}
        />
      </div>
      <CarouselProducts images={product.images} />
      <BenefitProducts />
      <InfoProducts
        item={{
          id: product.id,
          imageURL: product.images[0],
          name: product.name,
          price: Number(product.price),
          categoryName: product.category.name,
          locationName: product.location.name,
        }}
        isLoggedIn={session ? true : false}
        description={product.description}
        benefits={productInfo.benefits}
        reviews={productInfo.reviews}
      />
      <Suspense fallback="Mohon tunggu....">
        <div
          id="recommedations"
          className="container max-w-[1130px] mx-auto flex items-center gap-[50px] justify-center mt-[50px] mb-[100px]"
        >
          <SectionProducts title="Produk Lain Yang Mungkin Dibutuhkan" />
        </div>
      </Suspense>
    </>
  );
}
