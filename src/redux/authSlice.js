import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";
import { deleteCookie } from "./cookiesSlice";

// Async Thunk for authLogIn
export const authLogIn = createAsyncThunk(
  "auth/authLogIn",
  async (requestBody) => {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data;
  }
);

// Async Thunk for authSignUp
export const authSignUp = createAsyncThunk(
  "auth/authSignUp",
  async (requestBody) => {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data;
  }
);

// Async Thunk for authLogOut
export const authLogOut = createAsyncThunk(
  "auth/authLogOut",
  async (_, { dispatch }) => {
    dispatch(deleteCookie({ name: "JWTToken" }));
    return true;
  }
);

// Async Thunk for authForgotPassword
export const authForgotPassword = createAsyncThunk(
  "auth/authForgotPassword",
  async (requestBody) => {
    const response = await fetch(`${baseUrl}/auth/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data;
  }
);

// Async Thunk for authPasswordResetCode
export const authPasswordResetCode = createAsyncThunk(
  "auth/authPasswordResetCode",
  async (requestBody) => {
    const response = await fetch(`${baseUrl}/auth/passwordResetCode`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Log in
      .addCase(authLogIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLogIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(authLogIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Sign up
      .addCase(authSignUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Log out
      .addCase(authLogOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLogOut.fulfilled, (state) => {
        state.status = "succeeded";
        state.data = null;
      })
      .addCase(authLogOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Forgot password
      .addCase(authForgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authForgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(authForgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Password reset code
      .addCase(authPasswordResetCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authPasswordResetCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(authPasswordResetCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;