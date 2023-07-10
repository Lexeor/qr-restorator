import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import selectedReducer from "./selectedSlice";
import currencyReducer from "./currencySlice";

//reducers

const store = configureStore({
  reducer: {
    cart: cartReducer,
    selected: selectedReducer,
    currency: currencyReducer,
  },
});

export default store;
