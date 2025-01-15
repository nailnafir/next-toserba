import { getBrands } from "../../lib/data";
import CheckboxFilterItem from "../../_components/checkbox-filter-item";

export default async function FilterBrand() {
  const brands = await getBrands();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Merek</p>
      {brands.map((brand) => (
        <CheckboxFilterItem
          key={brand.name + brand.id}
          id={brand.id}
          value={brand.name}
          type="brand"
        />
      ))}
    </div>
  );
}
