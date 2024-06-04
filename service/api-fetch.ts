import QueryString from "qs";
import { BaseAPI } from "./base-api";
import {
  ProductRequestInterface,
  ProductsResponseInterface,
  ProductUpdateInterface,
} from "@/interfaces/api-interfaces";
import axios from "axios";

async function getProducts(limit: number, offset: number, searchQuery: string) {
  let queryString;
  if (searchQuery === "") {
    queryString = QueryString.stringify({
      limit: limit,
      offset: offset,
    });
  } else {
    queryString = QueryString.stringify({
      limit: limit,
      offset: offset,
      title: searchQuery,
    });
  }
  try {
    return await BaseAPI.get(
      `/products${queryString === "" ? "" : `?${queryString}`}`
    ).then((res) => {
      return res.data;
    });
  } catch (err) {
    return err;
  }
}

async function getImage(url: string) {
  try {
    return await fetch(url).then((res) => res.blob());
  } catch (error) {
    return error;
  }
}

async function getAllProducts(search?: string | null) {
  if (search) {
    try {
      const data = await BaseAPI.get("/products").then((res) => res.data);
      return data;
    } catch (error) {
      return error;
    }
  } else {
    try {
      const data = await BaseAPI.get(`/products?title=${search}`).then(
        (res) => res.data
      );
      return data;
    } catch (error) {
      return error;
    }
  }
}

async function getProductById(id: number | string) {
  try {
    const res = await BaseAPI.get("/products/" + id).then((res) => res.data);
    return res;
  } catch (error) {
    return error;
  }
}

async function getCategories() {
  try {
    const res = await BaseAPI.get("/categories").then((res) => res.data);
    return res;
  } catch (error) {
    return error;
  }
}

async function createProduct(product: ProductRequestInterface) {
  try {
    const reqBody = JSON.stringify(product);
    const res = await BaseAPI.post("/products", reqBody, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    return error;
  }
}

async function updateProduct(data: {
  id: number;
  product: ProductRequestInterface;
}) {
  try {
    const res = await BaseAPI.put(
      `/products/${data.id}`,
      JSON.stringify(data.product),
      {
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => res.data);
    return res;
  } catch (error) {
    return error;
  }
}

async function deleteProduct(id: number) {
  try {
    const res = await BaseAPI.delete(`/products/${id}`);
    return res;
  } catch (error) {
    return error;
  }
}

export const ProductAPI = {
  getProducts,
  getImage,
  getAllProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
};
