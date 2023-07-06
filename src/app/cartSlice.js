import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existItem = state.itemsList.find((item) => item.id === newItem.id);

      if (existItem) {
        existItem.quantity++;
        existItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          totalPrice: newItem.price,
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
        existItem.totalPrice -= removedItem.price;
      } else {
        state.itemsList = state.itemsList.filter(
          (item) => item.id !== removedItem.id
        );
      }
      state.totalQuantity--;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
