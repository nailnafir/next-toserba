import CustomerBreadcrumbs from "../_components/customer-breadcrumbs";
import CustomerNavigationBar from "../_components/customer-navigation-bar";
import CartProducts from "./_components/cart-products";
import CheckoutForm from "./_components/checkout-form";

export default function CartPage() {
  return (
    <>
      <header className="bg-[#EFF3FA] pt-[30px] h-[351px] -mb-[181px]">
        <CustomerNavigationBar />
      </header>
      <div
        id="title"
        className="container max-w-[1130px] mx-auto flex items-center justify-between"
      >
        <div className="flex flex-col gap-5">
          <CustomerBreadcrumbs />
          <h1 className="font-bold text-4xl leading-9">Keranjang Belanja</h1>
        </div>
      </div>
      <CartProducts />
      <CheckoutForm />
    </>
  );
}
