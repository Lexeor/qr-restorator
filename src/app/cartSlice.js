import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../utils/localStorage";

const initialState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existItem = state.itemsList.find((item) => item.id === newItem.id);

      if (existItem) {
        existItem.quantity++;
        existItem.totalPrice += Number(existItem.price);
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: Number(newItem.price),
          totalPrice: Number(newItem.price),
          quantity: 1,
          name: newItem.name,
          cover: newItem.cover,
        });
      }
      state.totalQuantity++;
      saveState(state);
    },
    removeFromCart: (state, action) => {
      const removedItem = action.payload;

      const existItem = state.itemsList.find(
        (item) => item.id === removedItem.id
      );

      if (existItem.quantity > 1) {
        existItem.quantity--;
        existItem.totalPrice -= Number(removedItem.price);
      } else {
        state.itemsList = state.itemsList.filter(
          (item) => item.id !== removedItem.id
        );
      }
      state.totalQuantity--;
      saveState(state);
    },
    clearCart: (state) => {
      state.itemsList = [];
      state.totalQuantity = 0;
      saveState(state);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
