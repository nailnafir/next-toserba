import CheckboxFilterItem from "../../_components/checkbox-filter-item";

export default function FilterStock() {
  const stocks = [
    {
      id: 1,
      name: "ready",
    },
    {
      id: 2,
      name: "preorder",
    },
  ];

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Stok</p>
      {stocks.map((stock) => (
        <CheckboxFilterItem
          key={stock.id + stock.name}
          id={stock.id}
          value={stock.name}
          type="stock"
        />
      ))}
    </div>
  );
}
