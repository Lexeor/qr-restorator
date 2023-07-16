import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: -1,
  name: "Default name",
  address: "Default address",
  menu: -1,
  table: -1,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    set: (state, action) => {
      state = action.payload;
    },
    setTable: (state, action) => {
      state.table = action.payload;
    },
  },
});

export default restaurantSlice.reducer;
export const { set, setTable } = restaurantSlice.actions;
