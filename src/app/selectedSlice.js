import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: {},
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    set: (state, action) => {
      state.item = action.payload;
    },
    clear: (state) => {
      state.item = {};
    },
  },
});

export default selectedSlice.reducer;
export const { set, clear } = selectedSlice.actions;
