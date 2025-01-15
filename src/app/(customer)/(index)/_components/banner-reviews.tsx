import ContainerReviewItem from "./container-review-item";

export default function BannerReviews() {
  const reviews = [
    {
      photo: null,
      description: `Menghemat uang 25%`,
      userName: "Nailul Firdaus",
    },
    {
      photo: null,
      description: `Produk asli semua`,
      userName: "Berliana Rizka",
    },
    {
      photo: null,
      description: `Lengkap banget`,
      userName: "Asyraf Zayn Hafidz",
    },
  ];

  return (
    <div className="container max-w-[1130px] mx-auto flex items-center justify-center gap-10 mt-[50px]">
      {reviews.map((review, index) => (
        <ContainerReviewItem
          key={index}
          photo={review.photo}
          userName={review.userName}
          description={review.description}
        />
      ))}
    </div>
  );
}
