"use client";
import BackButton from "@/components/button/backButton";
import { Button } from "@/components/button/customButton";
import CartCard from "@/components/cards/cartCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { deleteAllProduct } from "@/lib/features/cartSlice";
import { openNotification } from "@/lib/notification";
import { notification } from "antd";
import { useState } from "react";

const CartPage = () => {
  const { productData, totalProduct, totalPrice } = useAppSelector((state) => {
    let temp = [];
    let totalPrice = 0;
    let totalProduct = 0;
    for (const item in state.cart.products) {
      totalProduct += state.cart.products[item].total;
      totalPrice +=
        state.cart.products[item].total *
        state.cart.products[item].product.price;
      temp.push(state.cart.products[item]);
    }
    return { productData: temp, totalProduct, totalPrice };
  });
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();
  if (productData && totalProduct > 0) {
    return (
      <main>
        {contextHolder}
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-8">
            {productData.map(({ product, total }, key) => (
              <div key={key}>
                <CartCard productData={product} total={total} />
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-4 bg-white bg-opacity-10 backdrop-blur-lg p-16 rounded-[16px] h-fit">
            <p className="text-4xl font-bold">Product Summary</p>
            <div>
              <div>
                Total Items:{" "}
                <span className="font-bold">{totalProduct} Items</span>
              </div>
              <div>
                Total Price: <span className="font-bold">${totalPrice}</span>
              </div>
            </div>
            <Button
              variant={"outline"}
              onClick={() => {
                dispatch(deleteAllProduct(true));
                openNotification(
                  api,
                  "You've successfully purchased the items!",
                  "Product Purchased!"
                );
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <BackButton />
        <div className="flex w-full justify-center items-center h-[70vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="font-bold text-5xl">No product in cart!</div>
            <div className="max-w-[25rem] text-center">
              You haven't added any product yet! Go to shop and search for your
              favorite products
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default CartPage;
