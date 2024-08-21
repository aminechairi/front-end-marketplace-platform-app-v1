import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import handleUnauthorized from "../utils/handleUnauthorized";

// Async Thunk for fetching brands from the API
export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (queryParams) => {
    const url = new URL(`${baseUrl}/brands`);
    url.search = new URLSearchParams(queryParams).toString();
    const response = await fetch(url);
    handleUnauthorized(response);
    const data = await response.json();
    return data;
  }
);

const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default brandsSlice.reducer;
