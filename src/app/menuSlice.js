import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    set: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default menuSlice.reducer;
export const { set } = menuSlice.actions;
