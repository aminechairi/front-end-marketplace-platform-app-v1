import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";

// Async Thunk for fetching products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (queryParams) => {
    const url = new URL(`${baseUrl}/products`);
    url.search = new URLSearchParams(queryParams).toString();

    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const procutsSlice = createSlice({
  name: "products",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default procutsSlice.reducer;