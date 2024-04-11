import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";
import { brandSlice } from "./features/brand/brandSlice";
import { categorySlice } from "./features/category/categorySlice";
import { productSlice } from "./features/product/productSlice";
import { wishSlice } from "./features/wish/wishSlice";
import { cartSlice } from "./features/cart/cartSlice";
import { orderSlice } from "./features/order/orderSlice";

const rootReducer = combineSlices(categorySlice ,brandSlice, userSlice, productSlice, wishSlice, cartSlice, orderSlice );

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware();
    },
  });
};


// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
