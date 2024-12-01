import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./categoriesSlice";
import brandsReducer from "./brandsSlice";

import authReducer from "./authSlice";
import cookiesReducer from "./cookiesSlice";
import emailVerificationReducer from "./emailVerificationSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    brands: brandsReducer,

    auth: authReducer,
    cookies: cookiesReducer,
    emailVerification: emailVerificationReducer,

  },
});

export default store;
