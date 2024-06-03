"use client";
import BackButton from "@/components/button/backButton";
import MutateCartButton from "@/components/button/mutateCartButton";
import DetailPageCarousel from "@/components/carousel/detailPageCarousel";
import { ProductsResponseInterface } from "@/interfaces/api-interfaces";
import { ProductAPI } from "@/service/api-fetch";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import Slider from "react-slick";

const ProductDetailPage = () => {
  const pathname = usePathname();
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const paths = pathname.split("/");
  const { id } = useParams();
  let parsedId: number;
  if (typeof id === "string") {
    parsedId = parseInt(id);
  } else {
    setIsNotFound(true);
  }

  const { isLoading, error, data } = useQuery<
    boolean,
    AxiosError | null,
    ProductsResponseInterface
  >({
    queryKey: ["product", id],
    queryFn: () => ProductAPI.getProductById(parsedId),
  });

  if (data instanceof AxiosError || isNotFound) {
    return (
      <div>
        <div>Not Found</div>
      </div>
    );
  } else if (data) {
    let updatedAt = dayjs(data.updatedAt);

    return (
      <main className="">
        <BackButton />
        <Breadcrumb className="mt-4">
          {paths.slice(1).map((path, idx) => {
            let href = "/";

            for (let item in paths.slice(1)) {
              if (parseInt(item) > idx) {
                break;
              }
              href = href + paths.slice(1)[item] + "/";
              if (parseInt(item) == paths.slice(1).length - 1) {
                href = "";
              }
            }
            if (href !== "") {
              return (
                <Breadcrumb.Item href={href} key={idx}>
                  {path[0].toUpperCase() + path.substring(1)}
                </Breadcrumb.Item>
              );
            } else {
              return <Breadcrumb.Item key={idx}>{data?.title}</Breadcrumb.Item>;
            }
          })}
        </Breadcrumb>
        <section className="grid grid-cols-2 mt-4">
          <div className="max-w-[25rem]">
            <DetailPageCarousel productImages={data!.images} />
          </div>
          <div>
            <h1 className="font-semibold text-lg md:text-[28px] pt-6 pb-4 md:pt-0 md:pb-7">
              {data.title}
            </h1>
            <p className="text-[28px] md:text-3xl font-bold pb-1 md:pb-[16px]">
              $ {data.price}
            </p>
            <p className="text-xs md:text-sm pb-4 md:pb-7 text-gray-400">
              Last updated at:{" "}
              {/* <span className="text-red">{selectedProduct?.stock}</span> */}
              <span className="text-red">
                {updatedAt.format("dddd, DD MMMM YYYY")}
              </span>
            </p>
            <p className="text-sm md:border-b md:pb-1">{data.description}</p>
            <MutateCartButton
              className="mt-4"
              product={data}
              checkoutButton={true}
            />
            <p className="text-xs md:text-lg pt-4 md:pt-6">
              <span className="text-customGray">Categories: </span>
              {data.category.name}
            </p>
          </div>
        </section>
      </main>
    );
  } else {
    {
      return (
        <div>
          <div>Not Found</div>
        </div>
      );
    }
  }
};

export default ProductDetailPage;
