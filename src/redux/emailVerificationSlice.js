import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import handleUnauthorized from "../utils/handleUnauthorized";

// Async Thunk for emailVerification
export const emailVerification = createAsyncThunk(
  "emailVerification/emailVerification",
  async (_, { getState }) => {
    const state = getState();
    const JWTToken = state.cookies.JWTToken;

    const response = await fetch(`${baseUrl}/users/emailVerification`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWTToken}`,
      },
    });

    handleUnauthorized(response);

    const data = await response.json();

    return data;
  }
);

// Async Thunk for emailVerificationCode
export const emailVerificationCode = createAsyncThunk(
  "emailVerification/emailVerificationCode",
  async (requestBody, { getState }) => {
    const state = getState();
    const JWTToken = state.cookies.JWTToken;

    const response = await fetch(`${baseUrl}/users/emailverificationcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWTToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    handleUnauthorized(response);

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
      .addCase(emailVerificationCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(emailVerificationCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(emailVerificationCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default emailVerificationSlice.reducer;
