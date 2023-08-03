import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    open: (state) => {
      state.show = true;
    },
    close: (state) => {
      state.show = false;
    },
    toggle: (state) => {
      state.show = !state.show;
    },
  },
});

export default popupSlice.reducer;
export const { open, close, toggle } = popupSlice.actions;
