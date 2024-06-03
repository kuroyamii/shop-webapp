"use client";
import { ProductsResponseInterface } from "@/interfaces/api-interfaces";
import { ProductAPI } from "@/service/api-fetch";
import { ShoppingFilled } from "@ant-design/icons";
import { Skeleton } from "antd";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../button/customButton";
import MutateCartButton from "../button/mutateCartButton";

const ProductCard = ({
  productData,
}: {
  productData: ProductsResponseInterface;
}) => {
  const [imageSourceUrl, setImageSourceUrl] = useState<string>("");
  async function getImageBlob() {
    const res: Blob | AxiosError | unknown = await ProductAPI.getImage(
      productData.images[0].replace("[", "").replace("]", "").replace(`"`, "")
    ).then((response) => {
      if (response instanceof Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = function () {
          const base64Data = reader.result;
          if (typeof base64Data == "string") {
            setImageSourceUrl(base64Data);
          }
        };
      }
    });
  }

  useEffect(() => {
    getImageBlob();
  }, [productData]);
  return (
    <div className="flex flex-col justify-between h-full space-y-4 w-[240px] bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-[16px] hover:cursor-pointer translate-y-0 hover:-translate-y-2 transition-all duration-500">
      <Link
        href={"/shop/products/" + productData.id}
        className="flex flex-col space-y-4"
      >
        <div
          className={`relative w-52 h-52 top-0 left-0 overflow-hidden rounded-[8px] ${
            imageSourceUrl === ""
              ? "border border-gray-500 bg-gray-900 bg-opacity-30"
              : ""
          }`}
        >
          {imageSourceUrl === "" ? (
            <Skeleton.Image
              style={{ height: "100%", width: "13rem" }}
              className="w-52 h-52"
              active
            />
          ) : (
            <Image
              onError={() => {
                setImageSourceUrl("");
              }}
              src={imageSourceUrl}
              alt={productData.title}
              priority
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-row w-full justify-between">
          <div className="h-fit break-words max-w-[9rem]">
            {productData.title.substring(0, 25) +
              `${productData.title.length > 25 ? "..." : ""}`}
          </div>
          <div className="h-fit text-xl font-bold text-yellow-100">
            {productData.price + "$"}
          </div>
        </div>
      </Link>

      <div className="w-full">
        <MutateCartButton product={productData} />
      </div>
    </div>
  );
};

export default ProductCard;
