import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from "../utils/localStorage";

const initialState = loadState("order");

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      console.log('payload', action.payload);
      state.itemsList = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      saveState("order", state);
    },
    clearOrder: state => {
      state.itemsList = [];
      state.totalQuantity = 0;
      saveState("order", state);
    }
  }
});

export default orderSlice.reducer;
export const { setOrder, clearOrder } = orderSlice.actions;