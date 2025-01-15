import { CardProductItemProps } from "@/app/interfaces";
import { ProductStock, StatusOrder } from "@prisma/client";

export type ActionResult = {
  message: string;
};

export type TParams = {
  id: string;
};

export type ProductsColumn = {
  id: number;
  name: string;
  imageURL: string;
  categoryName: string;
  brandName: string;
  price: number;
  totalSales: number;
  stock: ProductStock;
  createdAt: Date;
};

export type OrderProducts = {
  name: string;
  image: string;
}

export type OrdersColumn = {
  id: number;
  products: OrderProducts[];
  customerName: string;
  price: number;
  status: StatusOrder;
}

export type CustomersColumn = {
  id: number;
  name: string;
  email: string;
  totalTransactions: number;
}

export type CatalogsFilter = {
  search?: string;
  minimumPrice?: number;
  maximumPrice?: number;
  stocks?: ProductStock[] | null;
  brands?: number[] | null;
  locations?: number[] | null;
  categories?: number[] | null;
};

export type CartProduct = CardProductItemProps & {quantity: number}