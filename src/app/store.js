import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import selectedReducer from "./selectedSlice";

//reducers

const store = configureStore({
  reducer: {
    cart: cartReducer,
    selected: selectedReducer,
  },
});

export default store;
