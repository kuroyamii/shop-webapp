"use client";
import { MinusOutlined, PlusOutlined, ShoppingFilled } from "@ant-design/icons";
import { Button } from "./customButton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { ProductsResponseInterface } from "@/interfaces/api-interfaces";
import {
  addProductToCart,
  decreaseProductInCart,
} from "@/lib/features/cartSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { openNotification } from "@/lib/notification";

const MutateCartButton = ({
  className,
  product,
  checkoutButton = false,
  withNotification = true,
}: {
  withNotification?: boolean;
  checkoutButton?: boolean;
  className?: string;
  product: ProductsResponseInterface;
}) => {
  const dispatch = useAppDispatch();
  const [isMutable, setIsMutable] = useState<boolean>(false);
  const data = useAppSelector((state) => state.cart.products[product.id]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (data && data.total) {
      setIsMutable(true);
    } else {
      setIsMutable(false);
    }
  }, [data]);
  function triggerNotif(mode: "add" | "subtract" = "add") {
    if (!withNotification) {
      return;
    }
    if (mode == "add") {
      openNotification(
        api,
        `You successfully added ${product.title} to the cart! check your cart now to see the items you've been added to the cart!`,
        "Item added to your cart!",
        "bottomRight"
      );
    } else {
      openNotification(
        api,
        `Looks like you've lost your interest to ${product.title}. If you mind, check out other items that might suits you well! Cheers.`,
        "Item taken out from your cart",
        "bottomRight"
      );
    }
  }
  const router = useRouter();
  if (!isMutable) {
    return (
      <>
        {contextHolder}
        <Button
          className={"flex flex-row items-center " + className}
          variant="outline"
          onClick={() => {
            dispatch(addProductToCart(product));
            triggerNotif("add");
          }}
        >
          <ShoppingFilled className="mr-2" />
          Add to Cart
        </Button>
      </>
    );
  } else {
    return (
      <>
        {contextHolder}
        <div
          className={"flex flex-row items-center space-x-8 h-fit " + className}
        >
          <div
            className={"grid grid-cols-3 w-fit items-center justify-center "}
          >
            <Button
              variant={"outline"}
              intent={"circle"}
              onClick={() => {
                dispatch(decreaseProductInCart(product));
                triggerNotif("subtract");
              }}
            >
              <MinusOutlined />
            </Button>
            <p className="text-center">{data?.total}</p>
            <Button
              variant={"outline"}
              intent={"circle"}
              onClick={() => {
                dispatch(addProductToCart(product));
                triggerNotif("add");
              }}
            >
              <PlusOutlined />
            </Button>
          </div>
          {checkoutButton && (
            <Button
              className="!rounded-full px-8"
              intent={"primary"}
              onClick={() => {
                router.push("/shop/cart");
              }}
            >
              Checkout
            </Button>
          )}
        </div>
      </>
    );
  }
};

export default MutateCartButton;
