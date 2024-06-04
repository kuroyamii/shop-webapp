"use client";
import { ProductsResponseInterface } from "@/interfaces/api-interfaces";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ProductCard from "../cards/productCard";
import { Button, Pagination } from "antd";
import { ProductAPI } from "@/service/api-fetch";
import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import QueryString from "qs";
import ProductViewSectionSkeleton from "../skeleton/sections/productViewSectionSkeleton";

import Search, { SearchProps } from "antd/es/input/Search";
import SearchBar from "../search-bar/searchBar";

const ProductViewSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  let currentPage: number | string | null = searchParams.get("page");
  let limit: number | string | null = searchParams.get("limit");
  let offset: number | string | null = searchParams.get("offset");
  let search: string | null = searchParams.get("search");

  if (search === null) search = "";

  if (limit === null) {
    limit = 10;
  } else {
    limit = parseInt(limit);
  }
  if (offset === null) {
    offset = 0;
  } else {
    offset = parseInt(offset);
  }
  if (currentPage === null) {
    currentPage = 0;
  } else {
    currentPage = parseInt(currentPage);
  }

  const { isLoading, error, data } = useQuery<
    boolean,
    AxiosError | null,
    ProductsResponseInterface[]
  >({
    queryKey: ["products", limit, offset, search],
    queryFn: () => ProductAPI.getProducts(limit, offset, search!),
  });

  const {
    isLoading: isLoadingAllProduct,
    error: errorGetAllProduct,
    data: allProductData,
  } = useQuery<boolean, AxiosError | null, ProductsResponseInterface[]>({
    queryKey: ["all-products", search],
    queryFn: () => ProductAPI.getAllProducts(search),
  });

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    search = value;
    let queryString;
    if (search !== "") {
      queryString = QueryString.stringify({
        limit: limit,
        offset: offset,
        search: search,
      });
    } else {
      queryString = QueryString.stringify({
        limit: limit,
        offset: offset,
      });
    }
    router.push(`/shop?${queryString}`);
  };

  function onChangePage(pageNumber: number) {
    let query = "";
    if (search == "") {
      if (typeof limit === "number") {
        query = QueryString.stringify({
          limit,
          offset: limit * (pageNumber - 1),
          page: pageNumber,
        });
      }
    } else {
      if (typeof limit === "number") {
        query = QueryString.stringify({
          limit,
          offset: limit * (pageNumber - 1),
          search,
          page: pageNumber,
        });
      }
    }
    router.push(`/shop?${query}`);
  }

  if (data && allProductData && data.length > 0) {
    return (
      <section className="">
        <SearchBar search={search} onSearch={onSearch} />
        <div className="grid grid-cols-5 gap-4">
          {data?.map((productData: ProductsResponseInterface, idx) => (
            <div key={idx} className="place-self-center h-full">
              <ProductCard productData={productData} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Pagination
            current={currentPage}
            total={allProductData.length}
            onChange={onChangePage}
            pageSize={limit - 1}
            showSizeChanger={false}
          />
        </div>
      </section>
    );
  } else if (data?.length == 0) {
    return (
      <div>
        <div className="py-4 max-w-[20rem]">
          <SearchBar isDisabled={false} search={search} onSearch={onSearch} />
        </div>
        <div className="w-full h-[20rem] flex flex-col items-center justify-center bg-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden font-bold text-2xl">
          No Data Found
        </div>
      </div>
    );
  } else {
    return (
      <>
        <SearchBar isDisabled={true} />
        <ProductViewSectionSkeleton />
      </>
    );
  }
};

export default ProductViewSection;
