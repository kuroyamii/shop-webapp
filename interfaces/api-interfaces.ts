import { AxiosHeaders } from "axios";
import dayjs from "dayjs";

export interface ProductsResponseInterface {
  category: ProductCategoryInterface;
  creationAt: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  updatedAt: string;
}

export type ProductType = {
  category: ProductCategoryInterface;
  creationAt: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  updatedAt: string;
};

export interface ProductCategoryInterface {
  creationAt: string;
  id: number;
  image: string;
  name: string;
  updatedAt: string;
}

export interface ProductRequestInterface {
  title: string;
  description: string;
  images: string[];
  price: number;
  categoryId: number;
}

export interface ProductUpdateInterface {
  title?: string;
  description?: string;
  images?: string[];
  price?: number;
}
