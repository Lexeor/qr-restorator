import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

//reducers

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
