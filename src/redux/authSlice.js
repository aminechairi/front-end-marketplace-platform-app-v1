import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseUrl from "../config/config";

// Async Thunk for authLogin
export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password } ) => {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  }
);

// Async Thunk for logout
// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       localStorage.removeItem("token");
//       return {};
//     } catch (error) {
//       return rejectWithValue("Logout failed");
//     }
//   }
// );

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
      .addCase(authLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(logout.fulfilled, (state) => {
      //   state.status = "idle";
      //   state.user = null;
      //   state.token = null;
      //   state.error = null;
      // })
      // .addCase(logout.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload;
      // });
  },
});

export default authSlice.reducer;
