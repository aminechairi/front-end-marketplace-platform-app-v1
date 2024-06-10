import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import cookieManager from "../utils/cookieManager";

// Async Thunk for emailVerification
export const emailVerification = createAsyncThunk(
  "emailVerification/emailVerification",
  async () => {
    const response = await fetch(`${baseUrl}/users/emailVerification`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
      },
    });
    const data = await response.json();

    return data;
  }
);

// Async Thunk for emailVerificationCode
export const emailverificationcode = createAsyncThunk(
  "emailVerification/emailverificationcode",
  async (requestBody) => {
    const response = await fetch(`${baseUrl}/users/emailverificationcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();

    return data;
  }
);

const emailVerificationSlice = createSlice({
  name: "emailVerification",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Email verification
      .addCase(emailVerification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(emailVerification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(emailVerification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Email verification code
      .addCase(emailverificationcode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(emailverificationcode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(emailverificationcode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default emailVerificationSlice.reducer;
