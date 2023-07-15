import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import selectedReducer from "./selectedSlice";
import currencyReducer from "./currencySlice";
import restaurantReducer from "./restaurantSlice";

//reducers

const store = configureStore({
  reducer: {
    cart: cartReducer,
    selected: selectedReducer,
    currency: currencyReducer,
    restaurant: restaurantReducer,
  },
});

export default store;
