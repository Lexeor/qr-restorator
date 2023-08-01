import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderReducer from './orderSlice';
import selectedReducer from "./selectedSlice";
import currencyReducer from "./currencySlice";
import restaurantReducer from "./restaurantSlice";
import menuSlice from "./menuSlice";

//reducers

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    selected: selectedReducer,
    currency: currencyReducer,
    restaurant: restaurantReducer,
    menu: menuSlice,
  },
});

export default store;
