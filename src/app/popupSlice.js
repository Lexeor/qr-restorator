import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  type: "",
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      state.show = true;
      state.type = action.payload;
    },
    closePopup: (state) => {
      state.show = false;
    },
  },
});

export default popupSlice.reducer;
export const { openPopup, closePopup } = popupSlice.actions;
