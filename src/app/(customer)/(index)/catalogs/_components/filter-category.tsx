import { getCategories } from "../../lib/data";
import CheckboxFilterItem from "../../_components/checkbox-filter-item";

export default async function FilterLocation() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Kategori</p>
      {categories.map((category) => (
        <CheckboxFilterItem
          key={category.name + category.id}
          id={category.id}
          value={category.name}
          type="category"
        />
      ))}
    </div>
  );
}
