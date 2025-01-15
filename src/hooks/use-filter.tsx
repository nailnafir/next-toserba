import { FilterState } from "@/app/interfaces";
import { create } from "zustand";

export const useFilter = create<FilterState>()((set) => ({
  filter: {
    search: "",
    minimumPrice: 0,
    maximumPrice: 0,
    stocks: [],
    brands: [],
    locations: [],
    categories: [],
  },
  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),
}));
