import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/fetch";

const defaultCurrency = {
  char_code: "USD",
  sign: "$",
  from_left: true,
  separated: false,
};

const initialState = {
  loading: false,
  error: "",
  currency: defaultCurrency,
};

export const fetchCurrency = createAsyncThunk("currency/fetchCurrency", () => {
  return axios.get("/menu/detail").then((response) => response.data.currency);
});

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    set: (state, action) => {
      state.currency.char_code = action.payload.char_code;
      state.currency.sign = action.payload.sign;
      state.currency.from_left = action.payload.from_left;
      state.currency.separated = action.payload.separated;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrency.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.loading = false;
      state.currency = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCurrency.rejected, (state, action) => {
      state.loading = false;
      state.currency = defaultCurrency;
      state.error = action.error.message;
    });
  },
});

export default currencySlice.reducer;
export const { set } = currencySlice.actions;
