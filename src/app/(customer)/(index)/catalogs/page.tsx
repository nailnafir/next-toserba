import CustomerNavigationBar from "../_components/customer-navigation-bar";
import CustomerBreadcrumbs from "../_components/customer-breadcrumbs";
import CustomerSearchBar from "../_components/customer-search-bar";
import FilterBrand from "./_components/filter-brand";
import FilterLocation from "./_components/filter-location";
import FilterPrice from "./_components/filter-price";
import FilterStock from "./_components/filter-stock";
import ContentProducts from "./_components/content-products";

export default function CatalogsPage() {
  return (
    <>
      <header className="bg-[#EFF3FA] pt-[30px] h-[480px] -mb-[310px]">
        <CustomerNavigationBar  />
      </header>
      <div
        id="title"
        className="container max-w-[1130px] mx-auto flex items-center justify-between"
      >
        <div className="flex flex-col gap-5">
          <CustomerBreadcrumbs />
          <h1 className="font-bold text-4xl leading-9">Katalog Produk</h1>
        </div>
        <CustomerSearchBar />
      </div>
      <div
        id="catalog"
        className="container max-w-[1130px] mx-auto flex gap-[30px] mt-[50px] pb-[100px]"
      >
        <form
          action=""
          className="flex flex-1 flex-col bg-white p-[30px] gap-5 h-fit border border-[#E5E5E5] rounded-[30px]"
        >
          <h2 className="font-bold text-2xl leading-[34px]">Filters</h2>
          <FilterPrice />
          <hr className="border-[#E5E5E5]" />
          <FilterStock />
          <hr className="border-[#E5E5E5]" />
          <FilterBrand />
          <hr className="border-[#E5E5E5]" />
          <FilterLocation />
        </form>
        <ContentProducts />
      </div>
    </>
  );
}
