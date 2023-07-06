import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

//reducers

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
