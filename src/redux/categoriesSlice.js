import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";

// Async Thunk for fetching categories from the API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (queryParams) => {
    const url = new URL(`${baseUrl}/categories`);
    url.search = new URLSearchParams(queryParams).toString();
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(addProductAsync.fulfilled, (state, action) => {
    //   state.list.push(action.payload);
    // })
    // .addCase(updateProductAsync.fulfilled, (state, action) => {
    //   const { id, updatedProduct } = action.payload;
    //   const index = state.list.findIndex((product) => product.id === id);
    //   state.list[index] = updatedProduct;
    // })
    // .addCase(removeProductAsync.fulfilled, (state, action) => {
    //   state.list = state.list.filter((product) => product.id !== action.payload);
    // });
  },
});

export default categoriesSlice.reducer;
