import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import handleUnauthorized from "../utils/handleUnauthorized";

// Async Thunk for fetching categories from the API
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (queryParams) => {
    const url = new URL(`${baseUrl}/categories`);
    url.search = new URLSearchParams(queryParams).toString();
    const response = await fetch(url);
    handleUnauthorized(response);
    const data = await response.json();
    return data;
  }
);

// Async Thunk for fetching sub categories from the API
// export const fetchSubCategories = createAsyncThunk(
//   "categories/fetchSubCategories",
//   async (queryParams) => {
//     const url = new URL(`${baseUrl}/subcategories`);
//     url.search = new URLSearchParams(queryParams).toString();
//     const response = await fetch(url);
//     handleUnauthorized(response);
//     const data = await response.json();
//     return data;
//   }
// );

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
      // .addCase(fetchSubCategories.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchSubCategories.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.data = action.payload;
      // })
      // .addCase(fetchSubCategories.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // });
  },
});

export default categoriesSlice.reducer;
