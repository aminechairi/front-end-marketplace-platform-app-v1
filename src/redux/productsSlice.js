import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import handleUnauthorized from "../utils/handleUnauthorized";

// Async Thunk for fetching products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (requestInformations, { getState }) => {
    const productId = requestInformations.id || "";
    const url = new URL(`${baseUrl}/products/${productId}`);
    url.search = new URLSearchParams(
      requestInformations.queryParams
    ).toString();

    const state = getState();
    const JWTToken = state.cookies.JWTToken;

    let token = "";
    if (JWTToken) {
      token = `Bearer ${JWTToken}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    handleUnauthorized(response);

    const data = await response.json();

    return { item: requestInformations.item, data: data };
  }
);

const procutsSlice = createSlice({
  name: "products",
  initialState: {
    0: {
      data: null,
      status: "idle",
    },
    1: {
      data: null,
      status: "idle",
    },
    2: {
      data: null,
      status: "idle",
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        const item = action.meta.arg.item;
        state[item].status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { item, data } = action.payload;
        state[item].status = "succeeded";
        state[item].data = data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        const item = action.meta.arg.item;
        state[item].status = "failed";
        state.error = action.error.message;
      });
  },
});

export default procutsSlice.reducer;
