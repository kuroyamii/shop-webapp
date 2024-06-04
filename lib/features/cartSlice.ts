import { ProductsResponseInterface } from "@/interfaces/api-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: <
    {
      products: {
        [key: number]: { total: number; product: ProductsResponseInterface };
      };
    }
  >{
    products: {},
  },
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<ProductsResponseInterface>
    ) => {
      // Check if the item is already added to cart
      if (action.payload.id in state.products) {
        // Add the total by 1 to the cart and also update the product data incase it updated
        state.products[action.payload.id] = {
          total: state.products[action.payload.id].total + 1,
          product: action.payload,
        };
      } else {
        // Add product to the state
        state.products[action.payload.id] = {
          total: 1,
          product: action.payload,
        };
      }
    },
    decreaseProductInCart: (
      state,
      action: PayloadAction<ProductsResponseInterface>
    ) => {
      // Check if the item is already added to cart
      if (
        action.payload.id in state.products &&
        state.products[action.payload.id].total > 0
      ) {
        if (state.products[action.payload.id].total <= 1) {
          delete state.products[action.payload.id];
        } else {
          state.products[action.payload.id].total -= 1;
        }
      }
    },
    removeProduct: (
      state,
      action: PayloadAction<ProductsResponseInterface>
    ) => {
      delete state.products[action.payload.id];
    },
    deleteAllProduct: (state, action: PayloadAction<boolean>) => {
      state.products = {};
    },
  },
});

export const {
  addProductToCart,
  decreaseProductInCart,
  removeProduct,
  deleteAllProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
