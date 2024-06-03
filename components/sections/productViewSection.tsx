"use client";
import { ProductsResponseInterface } from "@/interfaces/api-interfaces";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ProductCard from "../cards/productCard";
import { Button, Pagination } from "antd";
import { ProductAPI } from "@/service/api-fetch";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import QueryString from "qs";
import ProductViewSectionSkeleton from "../skeleton/sections/productViewSectionSkeleton";

const ProductViewSection = () => {
  const searchParams = useSearchParams();
  let currentPage: number | string | null = searchParams.get("page");
  let limit: number | string | null = searchParams.get("limit");
  let offset: number | string | null = searchParams.get("offset");

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
    queryKey: ["products", limit, offset],
    queryFn: () => ProductAPI.getProducts(limit, offset),
  });

  const {
    isLoading: isLoadingAllProduct,
    error: errorGetAllProduct,
    data: allProductData,
  } = useQuery<boolean, AxiosError | null, ProductsResponseInterface[]>({
    queryKey: ["all-products"],
    queryFn: () => ProductAPI.getAllProducts(),
  });

  const router = useRouter();
  function onChangePage(pageNumber: number) {
    if (typeof limit === "number") {
      const query = QueryString.stringify({
        limit,
        offset: limit * (pageNumber - 1),
        page: pageNumber,
      });
      router.push(`/shop?${query}`);
    }
  }
  if (data && allProductData) {
    return (
      <section className="">
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
            pageSize={limit}
            showSizeChanger={false}
          />
        </div>
      </section>
    );
  } else {
    return <ProductViewSectionSkeleton />;
  }
};

export default ProductViewSection;
