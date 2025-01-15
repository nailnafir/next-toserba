"use client";

import { useCart } from "@/hooks/use-cart";
import CardProductCartItem from "./card-product-cart-item";

export default function CartProducts() {
  const { products } = useCart();

  return (
    <div
      id="cart"
      className="container max-w-[1130px] mx-auto flex flex-col gap-5 mt-[50px]"
    >
      {products.map((product) => (
        <CardProductCartItem key={product.id + product.name} item={product} />
      ))}
    </div>
  );
}
