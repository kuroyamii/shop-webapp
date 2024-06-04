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

const CartCard = ({
  productData,
  total,
}: {
  productData: ProductsResponseInterface;
  total: number;
}) => {
  const [imageSourceUrl, setImageSourceUrl] = useState<string>("");
  async function getImageBlob() {
    const res: Blob | AxiosError | unknown = await ProductAPI.getImage(
      productData.images[0]
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(`"`, "")
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
    <div className="flex flex-col justify-between h-full space-y-4 w-[40rem] bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-[16px]">
      <Link
        href={"/shop/products/" + productData.id}
        className="flex flex-row items-center space-x-4"
      >
        <div
          className={`relative w-32 h-32 top-0 left-0 overflow-hidden rounded-[8px] ${
            imageSourceUrl === ""
              ? "border border-gray-500 bg-gray-900 bg-opacity-30"
              : ""
          }`}
        >
          {imageSourceUrl === "" ? (
            <Skeleton.Image
              style={{ height: "100%", width: "8rem" }}
              className="w-32 h-32"
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
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col max-w-[30rem] space-y-4">
            <div className="h-fit break-words">
              {productData.title.substring(0, 40) +
                `${productData.title.length > 40 ? "..." : ""}`}
            </div>
            <div className="h-fit break-words text-sm ">
              {productData.description.substring(0, 100) +
                `${productData.description.length > 100 ? "..." : ""}`}
            </div>
          </div>
          <div className="h-fit text-4xl font-bold text-yellow-100">
            {productData.price + "$"}
          </div>
        </div>
      </Link>
      <div>
        <MutateCartButton product={productData} />
      </div>
    </div>
  );
};

export default CartCard;
