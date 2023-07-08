import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsList: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existItem = state.itemsList.find((item) => item.id === newItem.id);

      if (existItem) {
        existItem.quantity++;
        existItem.totalPrice += Number(newItem.price).toFixed(2);
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: Number(newItem.price).toFixed(2),
          totalPrice: Number(newItem.price).toFixed(2),
          quantity: 1,
          name: newItem.name,
          cover: newItem.cover,
        });
      }
      state.totalQuantity++;
    },
    removeFromCart: (state, action) => {
      const removedItem = action.payload;

      const existItem = state.itemsList.find(
        (item) => item.id === removedItem.id
      );

      if (existItem.quantity > 1) {
        existItem.quantity--;
        existItem.totalPrice -= Number(removedItem.price).toFixed(2);
      } else {
        state.itemsList = state.itemsList.filter(
          (item) => item.id !== removedItem.id
        );
      }
      state.totalQuantity--;
    },
    clearCart: (state) => {
      state.itemsList = [];
      state.totalQuantity = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
