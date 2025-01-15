import { CartProduct, CatalogsFilter, TParams } from "@/types";
import { Brand, Category, Location, Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

export interface SidebarProps {
  viewMode: "mobile" | "website";
  badgeValue?: {
    orders?: number;
    customers?: number;
  };
}

export interface SidebarBadgeProps {
  categories?: number | undefined;
  locations?: number | undefined;
  brands?: number | undefined;
  products?: number | undefined;
  orders?: number | undefined;
  customers?: number | undefined;
}

export interface ActionButtonProps {
  id?: number | undefined;
  buttonType: "save" | "delete";
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  typeTable:
    | "kategori"
    | "lokasi"
    | "merek"
    | "produk"
    | "pesanan"
    | "pelanggan";
}

export interface FormCategoriesProps {
  type: "add" | "edit";
  data: Category | null;
}

export interface FormLocationsProps {
  type: "add" | "edit";
  data: Location | null;
}

export interface FormBrandsProps {
  type: "add" | "edit";
  data: Brand | null;
}

export interface FormProductsProps {
  type?: "add" | "edit";
  data?: Product | null;
  children?: ReactNode;
}

export interface EditPageProps {
  params: TParams;
}

export interface GetProductsProps {
  orderBy: string;
  sortBy: "asc" | "desc";
}

export interface SectionProductsProps {
  title: string;
  orderBy?: "price" | undefined;
  sortBy?: "asc" | "desc" | undefined;
}

export interface CardProductItemProps {
  id: number;
  name: string;
  imageURL: string;
  categoryName: string;
  locationName: string;
  price: number;
}

export interface CheckboxFilterItemProps {
  id: number;
  value: string;
  type?: "stock" | "location" | "brand" | "category";
}

export interface FilterState {
  filter: CatalogsFilter;
  setFilter: (filter: CatalogsFilter) => void;
}

export interface DetailProductProps {
  params: TParams;
}

export interface RatingStarsProps {
  rating: number;
  totalRating?: number;
}

export interface CardReviewItemProps {
  rating: number;
  date: Date;
  description: string;
  userName: string;
  photo?: string | null;
}

export interface ContainerReviewItemProps {
  photo?: string | null;
  description: string;
  userName: string;
}

export interface CardPriceInfoProductProps {
  isLoggedIn: boolean;
  item: CardProductItemProps;
  benefits: string[];
}

export interface CarouselProductsProps {
  images: string[];
}

export interface InfoProductsProps {
  isLoggedIn: boolean,
  item: CardProductItemProps;
  description: string;
  benefits: string[];
  reviews: {
    rating: number;
    description: string;
    photo: string | null;
    userName: string;
    date: Date;
  }[];
}

export interface CartState {
  products: CartProduct[],
  addProduct: (cart: CartProduct) => void,
  increaseQuantity: (id: number) => void,
  decreaseQuantity: (id: number) => void,
  removeProduct: (id: number) => void,
}

export interface CardProductCartItemProps {
  item: CartProduct;
}

export interface ConcernProductItemProps {
  title: string;
  value?: number;
}