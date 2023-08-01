import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from "../utils/localStorage";

const initialState = loadState("order");

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToOrder: (state, action) => {
      console.log('payload', action.payload);
      state.itemsList = [...state.itemsList, ...action.payload.items];
      state.totalQuantity = state.totalQuantity + action.payload.totalQuantity;
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
export const { addToOrder, clearOrder } = orderSlice.actions;