import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import cookieManager from "../utils/cookieManager";
import handleUnauthorized from "../utils/handleUnauthorized";

// Async Thunk for add product to saves from the API
export const addProductToSaves = createAsyncThunk(
  "saves/addProductToSaves",
  async (requestBody) => {
    const response = await fetch(`${baseUrl}/saves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
      },
      body: JSON.stringify(requestBody),
    });

    handleUnauthorized(response);

    const data = await response.json();

    return data;
  }
);

// Async Thunk for remove product from saves from the API
export const removeProductFromSaves = createAsyncThunk(
  "saves/removeProductFromSaves",
  async (productId) => {
    const response = await fetch(`${baseUrl}/saves/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
      },
    });

    handleUnauthorized(response);

    const data = await response.json();

    return data;
  }
);

const savesSlice = createSlice({
  name: "saves",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add product to saves
      .addCase(addProductToSaves.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToSaves.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addProductToSaves.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Remove product from saves
      .addCase(removeProductFromSaves.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProductFromSaves.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(removeProductFromSaves.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default savesSlice.reducer;
