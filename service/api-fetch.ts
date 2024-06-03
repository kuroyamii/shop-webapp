import QueryString from "qs";
import { BaseAPI } from "./base-api";
import { ProductsResponseInterface } from "@/interfaces/api-interfaces";
import axios from "axios";

async function getProducts(limit?: number, offset?: number) {
  let queryString = QueryString.stringify({
    limit: limit,
    offset: offset,
  });
  try {
    return await BaseAPI.get(
      `/products${queryString === "" ? "" : `?${queryString}`}`
    ).then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log(err);
  }
}

async function getImage(url: string) {
  try {
    return await fetch(url).then((res) => res.blob());
    // console.log("yahho", btoa(response.data));
    // console.log(response);
  } catch (error) {
    return error;
  }
}

async function getAllProducts() {
  return await BaseAPI.get("/products").then((res) => res.data);
}

async function getProductById(id: number | string) {
  try {
    const res = await BaseAPI.get("/products/" + id).then((res) => res.data);
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
};
