"use client";

import { CheckboxFilterItemProps } from "@/app/interfaces";
import { useFilter } from "@/hooks/use-filter";
import { ProductStock } from "@prisma/client";
import { ChangeEvent } from "react";

export default function CheckboxFilterItem({
  id,
  value,
  type,
}: CheckboxFilterItemProps) {
  const { filter, setFilter } = useFilter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "stock":
        if (e.target.checked) {
          setFilter({
            stocks: [...(filter?.stocks ?? []), e.target.value as ProductStock],
          });
        } else {
          setFilter({
            stocks:
              filter?.stocks?.filter((stock) => stock !== e.target.value) ?? [],
          });
        }
        break;
      case "brand":
        if (e.target.checked) {
          setFilter({
            brands: [...(filter?.brands ?? []), Number(e.target.value)],
          });
        } else {
          setFilter({
            brands:
              filter?.brands?.filter(
                (brand) => brand !== Number(e.target.value)
              ) ?? [],
          });
        }
        break;
      case "category":
        if (e.target.checked) {
          setFilter({
            categories: [...(filter?.categories ?? []), Number(e.target.value)],
          });
        } else {
          setFilter({
            categories:
              filter?.categories?.filter(
                (category) => category !== Number(e.target.value)
              ) ?? [],
          });
        }
        break;
      case "location":
        if (e.target.checked) {
          setFilter({
            locations: [...(filter?.locations ?? []), Number(e.target.value)],
          });
        } else {
          setFilter({
            locations:
              filter?.locations?.filter(
                (location) => location !== Number(e.target.value)
              ) ?? [],
          });
        }
        break;
      default:
        break;
    }
  };

  const getLabel = () => {
    if (type === "stock") {
      switch (value) {
        case "ready":
          return "Tersedia";
        case "preorder":
          return "Pra Pesan";
        default:
          break;
      }
    } else {
      return value;
    }
  };

  return (
    <label
      className="font-semibold flex items-center gap-3"
      htmlFor={id + value}
    >
      <input
        id={id + value}
        type="checkbox"
        onChange={onChange}
        value={value}
        className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
      />
      <span>{getLabel()}</span>
    </label>
  );
}
