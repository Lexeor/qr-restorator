import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  orderId: -1,
  table: "",
  totalQuantity: 0,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      // console.log("payload", action.payload);
      state.orderId = action.payload.order_id;
      state.items = action.payload.items;
      state.table = action.payload.table;

      state.totalQuantity = action.payload.items.reduce(
        (acc, item) => acc + item.count,
        0
      );
      state.totalPrice = action.payload.items.reduce(
        (acc, item) => acc + item.count * item.price,
        0
      );
    },
    clearOrder: (state) => {
      state = initialState;
    },
  },
});

export default orderSlice.reducer;
export const { setOrder, clearOrder } = orderSlice.actions;
