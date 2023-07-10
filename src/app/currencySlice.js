import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "USD",
  symbol: "$",
  position: "left",
  separated: false,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    set: (state, action) => {
      state.name = action.payload.name;
      state.symbol = action.payload.symbol;
      state.position = action.payload.position;
      state.separated = action.payload.separated;
    },
  },
});

export default currencySlice.reducer;
export const { set } = currencySlice.actions;
