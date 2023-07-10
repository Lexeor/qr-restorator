import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "USD",
  symbol: "$",
  position: "left",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    // set: (state, action) => {
    // }
  },
});

export default currencySlice.reducer;
// export const { set } = cartSlice.actions;
