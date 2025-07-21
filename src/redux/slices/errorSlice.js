import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    type: null, // 'TOO_MANY_REQUESTS', 'NETWORK_ERROR', etc.
  },
  reducers: {
    setGlobalError: (state, action) => {
      state.type = action.payload;
    },
    clearGlobalError: (state) => {
      state.type = null;
    },
  },
});

export const { setGlobalError, clearGlobalError } = errorSlice.actions;
export default errorSlice.reducer;
