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

interface ProductCategoryInterface {
  creationAt: string;
  id: number;
  image: string;
  name: string;
  updatedAt: string;
}
