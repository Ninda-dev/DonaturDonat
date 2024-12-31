import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../src/features/productSlice";
import claimReducer from "../src/features/claimSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    claim: claimReducer,
  },
});
