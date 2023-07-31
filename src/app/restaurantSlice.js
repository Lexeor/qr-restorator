import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: -1,
  name: "",
  address: "",
  menu: -1,
  table: "null",
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    set: (state, action) => {
      let { id, name, address, menu, table } = action.payload;
      state.id = id;
      state.name = name;
      state.address = address;
      state.menu = menu;
      state.table = table;
    },
  },
});

export default restaurantSlice.reducer;
export const { set, setTable } = restaurantSlice.actions;
