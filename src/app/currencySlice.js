import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  char_code: null,
  sign: "$",
  from_left: true,
  separated: false,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    set: (state, action) => {
      state.char_code = action.payload.char_code;
      state.sign = action.payload.sign;
      state.from_left = action.payload.from_left;
      state.separated = action.payload.separated;
    },
  },
});

export default currencySlice.reducer;
export const { set } = currencySlice.actions;
