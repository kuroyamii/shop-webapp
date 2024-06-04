"use client";
import { ProductsResponseInterface } from "@/interfaces/api-interfaces";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ProductCard from "../cards/productCard";
import { ProductAPI } from "@/service/api-fetch";
import Link from "next/link";
import { Button } from "../button/customButton";
import ProductPreviewSectionSkeleton from "../skeleton/sections/productPreviewSectionSkeleton";

const ProductPreviewSection = () => {
  const limit = 5;
  const offset = 0;
  const { isLoading, error, data } = useQuery<
    boolean,
    AxiosError | null,
    ProductsResponseInterface[]
  >({
    queryKey: ["products", limit, offset],

    // Change later
    queryFn: () => ProductAPI.getProducts(limit, offset, ""),
  });

  if (data) {
    return (
      <section className="">
        <div className="grid grid-cols-5 gap-4">
          {data?.map((productData: ProductsResponseInterface, idx) => (
            <div key={idx} className="place-self-center h-full">
              <ProductCard productData={productData} />
            </div>
          ))}
        </div>
        <div className="w-full flex flex-row justify-center mt-8">
          <Link href="/shop">
            <Button className="px-6 rounded-full">Load More</Button>
          </Link>
        </div>
      </section>
    );
  } else {
    return <ProductPreviewSectionSkeleton />;
  }
};

export default ProductPreviewSection;
