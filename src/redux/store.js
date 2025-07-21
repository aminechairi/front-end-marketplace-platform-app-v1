import { configureStore } from "@reduxjs/toolkit";

import errorReducer from "./slices/errorSlice";
import cookiesReducer from "./slices/cookiesSlice";
import themeReducer from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    error: errorReducer,
    cookies: cookiesReducer,
    theme: themeReducer,
  },
});

export default store;
